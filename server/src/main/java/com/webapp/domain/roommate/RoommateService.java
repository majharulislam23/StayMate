package com.webapp.domain.roommate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoommateService {

  private final RoommatePostRepository roommatePostRepository;
  private final UserService userService;

  @Transactional(readOnly = true)
  public RoommatePostDto getPostById(@NonNull Long id) {
    RoommatePost post = roommatePostRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    return mapToDto(post);
  }

  @Transactional
  public RoommatePostDto createPost(@NonNull Long userId, RoommatePostDto request) {
    User user = userService.getUserById(userId);

    RoommatePost post = RoommatePost.builder()
        .user(user)
        .location(request.getLocation())
        .budget(request.getBudget())
        .moveInDate(request.getMoveInDate())
        .bio(request.getBio())
        .genderPreference(request.getGenderPreference())
        .smoking(request.getSmoking())
        .pets(request.getPets())
        .occupation(request.getOccupation())
        .latitude(request.getLatitude())
        .longitude(request.getLongitude())
        .build();

    RoommatePost savedPost = roommatePostRepository.save(post);
    return mapToDto(savedPost);
  }

  public List<RoommatePostDto> searchPosts(Long currentUserId, String location, Double minBudget, Double maxBudget,
      String genderPreference) {
    List<RoommatePost> posts = roommatePostRepository.searchPosts(location, minBudget, maxBudget, genderPreference);

    // If no user is logged in, just return raw results
    if (currentUserId == null) {
      return posts.stream()
          .map(this::mapToDto)
          .collect(Collectors.toList());
    }

    // Get current user's post preferences for matching
    List<RoommatePost> myPosts = roommatePostRepository.findByUserId(currentUserId);
    RoommatePost myPost = myPosts.isEmpty() ? null : myPosts.get(0);

    return posts.stream()
        .map(post -> {
          RoommatePostDto dto = mapToDto(post);
          // Calculate score if we have a baseline and it's not our own post
          if (myPost != null && !post.getUser().getId().equals(currentUserId)) {
            dto.setMatchScore(calculateMatchScore(myPost, post));
          }
          return dto;
        })
        .sorted((p1, p2) -> {
          // Sort by match score descending, nulls last
          if (p1.getMatchScore() == null && p2.getMatchScore() == null)
            return 0;
          if (p1.getMatchScore() == null)
            return 1;
          if (p2.getMatchScore() == null)
            return -1;
          return p2.getMatchScore().compareTo(p1.getMatchScore());
        })
        .collect(Collectors.toList());
  }

  public List<RoommatePostDto> getMyPosts(@NonNull Long userId) {
    return roommatePostRepository.findByUserId(userId)
        .stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  @Transactional
  public RoommatePostDto updatePost(@NonNull Long userId, @NonNull Long postId, RoommatePostDto request) {
    RoommatePost post = roommatePostRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));

    if (post.getUser() == null || post.getUser().getId() == null || !post.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized to update this post");
    }

    post.setLocation(request.getLocation());
    post.setBudget(request.getBudget());
    post.setMoveInDate(request.getMoveInDate());
    post.setBio(request.getBio());
    post.setGenderPreference(request.getGenderPreference());
    post.setSmoking(request.getSmoking());
    post.setPets(request.getPets());
    post.setOccupation(request.getOccupation());

    return mapToDto(roommatePostRepository.save(post));
  }

  @Transactional
  public void deletePost(@NonNull Long userId, @NonNull Long postId) {
    RoommatePost post = roommatePostRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));

    if (post.getUser() == null || post.getUser().getId() == null || !post.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized to delete this post");
    }

    roommatePostRepository.delete(post);
  }

  @Transactional
  public RoommatePostDto updateStatus(@NonNull Long id, RoommatePostStatus status) {
    RoommatePost post = roommatePostRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    post.setStatus(status);
    return mapToDto(roommatePostRepository.save(post));
  }

  @Transactional(readOnly = true)
  public List<RoommatePostDto> getAllPosts() {
    return roommatePostRepository.findAll().stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  private RoommatePostDto mapToDto(RoommatePost post) {
    return RoommatePostDto.builder()
        .id(post.getId())
        .userId(post.getUser() != null ? post.getUser().getId() : null)
        .userName(post.getUser().getFirstName() + " " + post.getUser().getLastName())
        .userAvatar(
            "https://ui-avatars.com/api/?name=" + post.getUser().getFirstName() + "+" + post.getUser().getLastName())
        .location(post.getLocation())
        .budget(post.getBudget())
        .moveInDate(post.getMoveInDate())
        .bio(post.getBio())
        .genderPreference(post.getGenderPreference())
        .smoking(post.getSmoking())
        .pets(post.getPets())
        .pets(post.getPets())
        .occupation(post.getOccupation())
        .latitude(post.getLatitude())
        .longitude(post.getLongitude())
        .status(post.getStatus())
        .createdAt(post.getCreatedAt().toString())
        .build();
  }

  @Transactional(readOnly = true)
  public List<RoommatePostDto> getMatches(@NonNull Long userId) {
    // 1. Get current user's post preferences
    List<RoommatePost> myPosts = roommatePostRepository.findByUserId(userId);
    if (myPosts.isEmpty()) {
      return java.util.Collections.emptyList();
    }
    RoommatePost myPost = myPosts.get(0); // Assume primary post

    // 2. Get all other active posts
    List<RoommatePost> allPosts = roommatePostRepository.findAll();

    // 3. Score and Filter
    return allPosts.stream()
        .filter(post -> !post.getUser().getId().equals(userId)) // Exclude self
        .filter(post -> post.getStatus() == RoommatePostStatus.APPROVED)
        .map(post -> {
          int score = calculateMatchScore(myPost, post);
          return new java.util.AbstractMap.SimpleEntry<>(post, score);
        })
        .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue())) // Sort by score desc
        .map(entry -> {
          RoommatePostDto dto = mapToDto(entry.getKey());
          dto.setMatchScore(entry.getValue()); // Ensure DTO has this field or add it
          return dto;
        })
        .collect(Collectors.toList());
  }

  private int calculateMatchScore(RoommatePost myPost, RoommatePost otherPost) {
    int score = 0;

    // Location (City level mostly) - Partial string match
    if (myPost.getLocation() != null && otherPost.getLocation() != null &&
        (myPost.getLocation().toLowerCase().contains(otherPost.getLocation().toLowerCase()) ||
            otherPost.getLocation().toLowerCase().contains(myPost.getLocation().toLowerCase()))) {
      score += 30;
    }

    // Budget (Overlap check)
    if (myPost.getBudget() != null && otherPost.getBudget() != null) {
      double diff = Math.abs(myPost.getBudget() - otherPost.getBudget());
      if (diff <= 200)
        score += 30; // Close budget
      else if (diff <= 500)
        score += 10;
    }

    // Gender Preference
    if (myPost.getGenderPreference() != null && otherPost.getUser().getGender() != null) {
      if (myPost.getGenderPreference().equalsIgnoreCase("ANY") ||
          myPost.getGenderPreference().equalsIgnoreCase(otherPost.getUser().getGender())) {
        score += 10;
      }
    }
    if (myPost.getSmoking() == otherPost.getSmoking())
      score += 10;
    if (myPost.getPets() == otherPost.getPets())
      score += 10;

    return score;
  }
}
