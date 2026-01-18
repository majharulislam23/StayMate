package com.webapp.domain.messaging.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

/**
 * Service for tracking user presence (online/offline status).
 * Uses in-memory storage for real-time presence tracking.
 */
@Service
@Slf4j
public class PresenceService {

  private final SimpMessagingTemplate messagingTemplate;

  // In-memory map of userId -> presence info
  private final Map<Long, UserPresence> userPresenceMap = new ConcurrentHashMap<>();

  public PresenceService(SimpMessagingTemplate messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  /**
   * Mark user as online when they connect to WebSocket
   */
  public void setUserOnline(Long userId, String email) {
    UserPresence presence = new UserPresence(userId, email, true, LocalDateTime.now());
    userPresenceMap.put(userId, presence);
    log.info("User {} is now ONLINE", userId);
    broadcastPresenceChange(userId, true);
  }

  /**
   * Mark user as offline when they disconnect from WebSocket
   */
  public void setUserOffline(Long userId) {
    UserPresence presence = userPresenceMap.get(userId);
    if (presence != null) {
      presence.setOnline(false);
      presence.setLastSeenAt(LocalDateTime.now());
      log.info("User {} is now OFFLINE", userId);
      broadcastPresenceChange(userId, false);
    }
  }

  /**
   * Check if a user is currently online
   */
  public boolean isUserOnline(Long userId) {
    UserPresence presence = userPresenceMap.get(userId);
    return presence != null && presence.isOnline();
  }

  /**
   * Get last seen timestamp for a user
   */
  public LocalDateTime getLastSeenAt(Long userId) {
    UserPresence presence = userPresenceMap.get(userId);
    return presence != null ? presence.getLastSeenAt() : null;
  }

  /**
   * Get full presence info for a user
   */
  public UserPresence getUserPresence(Long userId) {
    return userPresenceMap.get(userId);
  }

  /**
   * Broadcast presence change to all subscribers
   */
  private void broadcastPresenceChange(Long userId, boolean isOnline) {
    try {
      PresenceUpdate update = new PresenceUpdate(userId, isOnline, LocalDateTime.now());
      messagingTemplate.convertAndSend("/topic/presence", update);
    } catch (Exception e) {
      log.warn("Failed to broadcast presence change for user {}: {}", userId, e.getMessage());
    }
  }

  /**
   * Inner class for storing user presence
   */
  @lombok.Data
  @lombok.AllArgsConstructor
  public static class UserPresence {
    private Long userId;
    private String email;
    private boolean online;
    private LocalDateTime lastSeenAt;
  }

  /**
   * DTO for presence updates
   */
  @lombok.Data
  @lombok.AllArgsConstructor
  public static class PresenceUpdate {
    private Long userId;
    private boolean online;
    private LocalDateTime timestamp;
  }
}
