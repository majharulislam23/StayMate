package com.webapp.domain.ai.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webapp.domain.ai.dto.AiMatchRecommendation;
import com.webapp.domain.roommate.RoommatePost;
import com.webapp.domain.roommate.RoommatePostRepository;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchingService {

    private final AiService aiService;
    private final UserRepository userRepository;
    private final RoommatePostRepository roommatePostRepository;
    private final ObjectMapper objectMapper;

    /**
     * Findings matches for the given user using a hybrid approach: 1. Hard filters
     * (City, Role) via SQL (Repository) 2.
     * AI Scoring of top candidates
     */
    public List<AiMatchRecommendation> findMatches(User targetUser) {
        boolean aiAvailable = aiService.checkHealth();
        if (!aiAvailable) {
            log.warn("AI Service is down. Using fallback scoring.");
        }

        // Step 1: Candidate Selection (Hard Filters)
        // For now, fetching users in the same city with ROLE_USER, excluding self.
        // In production, this would be a specific @Query in UserRepository
        List<User> candidates = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(targetUser.getId()))
                .filter(u -> u.isRegularUser()) // Only match with other tenants for now
                .filter(u -> isSameCity(targetUser, u))
                .limit(5) // Limit to the top 5 candidates to save AI processing time
                .collect(Collectors.toList());

        if (candidates.isEmpty()) {
            return Collections.emptyList();
        }

        List<AiMatchRecommendation> recommendations = new ArrayList<>();

        // Step 2: AI Scoring (or fallback)
        for (User candidate : candidates) {
            String prompt = buildPrompt(targetUser, candidate);
            String aiResponse = aiAvailable ? aiService.generateResponse(prompt) : null;

            if (aiResponse != null) {
                try {
                    // Extract JSON from response (handling potential Markdown wrapping)
                    String jsonStr = extractJson(aiResponse);
                    JsonNode root = objectMapper.readTree(jsonStr);

                    int score = root.path("score").asInt(50);
                    String explanation = root.path("explanation").asText("No explanation provided");

                    // Builds recommendation from AI response data
                    recommendations.add(AiMatchRecommendation.builder()
                            .userId(candidate.getId())
                            .userName(candidate.getFullName())
                            .compatibilityScore(score)
                            .explanation(explanation)
                            .matchType(determineMatchType(score))
                            .build());

                } catch (Exception e) {
                    log.error("Failed to parse AI response for match: {}", e.getMessage());
                    // Add fallback for parse failures as well
                    recommendations.add(buildFallbackRecommendation(targetUser, candidate));
                }
            } else {
                // AI unavailable or failed for this candidate, use fallback
                recommendations.add(buildFallbackRecommendation(targetUser, candidate));
            }
        }

        // Sort by score descending
        recommendations.sort((a, b) -> b.getCompatibilityScore().compareTo(a.getCompatibilityScore()));

        return recommendations;
    }

    /**
     * Determines whether two users are from the same city
     */
    private boolean isSameCity(User u1, User u2) {
        if (u1.getCity() == null || u2.getCity() == null)
            return false;
        return u1.getCity().equalsIgnoreCase(u2.getCity());
    }

    private String determineMatchType(int score) {
        if (score >= 85)
            return "Perfect Match";
        if (score >= 70)
            return "Great Match";
        if (score >= 50)
            return "Good Match";
        return "Potential Match";
    }

    private String buildPrompt(User target, User candidate) {
        // Construct anonymized profiles
        String targetProfile = formatProfile(target);
        String candidateProfile = formatProfile(candidate);

        return String.format(
                """
                        You are an expert roommate matcher. Analyze the compatibility between these two users based on their profiles.

                        User A: %s
                        User B: %s

                        Respond strictly in JSON format with two fields: 'score' (integer 0-100) and 'explanation' (string, max 2 sentences).
                        Example: {"score": 85, "explanation": "Both value cleanliness and have similar schedules."}
                        Avoid markdown or additional text.
                        """,
                targetProfile, candidateProfile);
    }

    private String formatProfile(User user) {
        // Only include relevant, non-sensitive info for matching
        StringBuilder sb = new StringBuilder();
        if (user.getBio() != null)
            sb.append("Bio: ").append(user.getBio()).append("; ");
        // If we had more fields like specific preferences (smoking, pets), add them
        // here
        // For now, Bio is the main source of personality
        return sb.toString();
    }

    /**
     * Builds a fallback recommendation when AI is unavailable or fails.
     * Uses heuristic scoring if posts exist, otherwise 50.
     */
    private AiMatchRecommendation buildFallbackRecommendation(User targetUser, User candidate) {
        int score = 50;

        try {
            List<RoommatePost> targetPosts = roommatePostRepository.findByUserId(targetUser.getId());
            List<RoommatePost> candidatePosts = roommatePostRepository.findByUserId(candidate.getId());

            if (!targetPosts.isEmpty() && !candidatePosts.isEmpty()) {
                score = calculateHeuristicScore(targetPosts.get(0), candidatePosts.get(0));
            }
        } catch (Exception e) {
            log.warn("Heuristic scoring failed, using default 50: {}", e.getMessage());
        }

        return AiMatchRecommendation.builder()
                .userId(candidate.getId())
                .userName(candidate.getFullName())
                .compatibilityScore(score)
                .explanation(score > 60 ? "Based on budget and lifestyle preferences."
                        : "Potential match based on location.")
                .matchType(determineMatchType(score))
                .build();
    }

    private int calculateHeuristicScore(RoommatePost p1, RoommatePost p2) {
        int score = 50; // Base score (Same City)

        // 1. Budget Compatibility (Weight: 20)
        // If budgets are within 20% of each other
        if (p1.getBudget() != null && p2.getBudget() != null) {
            double diff = Math.abs(p1.getBudget() - p2.getBudget());
            double avg = (p1.getBudget() + p2.getBudget()) / 2.0;
            if (avg > 0 && diff <= avg * 0.2) {
                score += 20;
            } else if (avg > 0 && diff <= avg * 0.4) {
                score += 10;
            }
        }

        // 2. Smoking (Weight: 10)
        if (p1.getSmoking() != null && p2.getSmoking() != null && p1.getSmoking().equals(p2.getSmoking())) {
            score += 10;
        }

        // 3. Pets (Weight: 10)
        if (p1.getPets() != null && p2.getPets() != null && p1.getPets().equals(p2.getPets())) {
            score += 10;
        }

        // 4. Cleanliness (Weight: 5)
        if (p1.getCleanliness() != null && p2.getCleanliness() != null && p1.getCleanliness() == p2.getCleanliness()) {
            score += 5;
        }

        // 5. Sleep Schedule (Weight: 5)
        if (p1.getSleepSchedule() != null && p2.getSleepSchedule() != null
                && p1.getSleepSchedule() == p2.getSleepSchedule()) {
            score += 5;
        }

        return Math.min(score, 99);
    }

    private String extractJson(String response) {
        // Remove Markdown code blocks if present (```json ... ``` )
        if (response.contains("```json")) {
            int start = response.indexOf("```json") + 7;
            int end = response.lastIndexOf("```");
            if (end > start) {
                return response.substring(start, end).trim();
            }
        }
        // Extracts content between backticks if present
        if (response.contains("```")) {
            int start = response.indexOf("```") + 3;
            int end = response.lastIndexOf("```");
            if (end > start) {
                return response.substring(start, end).trim();
            }
        }
        return response.trim();
    }
}
