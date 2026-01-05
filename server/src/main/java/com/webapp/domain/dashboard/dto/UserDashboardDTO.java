package com.webapp.domain.dashboard.dto;

import java.math.BigDecimal;
import java.util.List;

import com.webapp.domain.property.dto.PropertyResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDashboardDTO {
  private double compatibilityMatchStats; // Average match %
  private long upcomingVisitsCount;
  private long unreadNotificationsCount;

  private List<PropertyResponse> recommendedRooms;

  // Prompt asks for "Recommended Roommates" too
  private List<com.webapp.domain.ai.dto.AiMatchRecommendation> recommendedRoommates;

  // New Aggregated Stats
  private long savedItemsCount;
  private long activeSearchesCount;
  private long pendingVisitsCount;

  // Verification Tracking
  private VerificationProgress verificationProgress;

  // Finance / Expense Stats
  private FinanceStats financeStats;

  // Emergency / Quick Access
  private List<PropertyResponse> emergencyRooms;

  @Data
  @Builder
  public static class VerificationProgress {
    private int totalProgress; // 0-100
    private boolean emailVerified;
    private boolean phoneVerified;
    private boolean profileCompleted;
    private boolean idVerified;
    private boolean referenceVerified;
  }

  @Data
  @Builder
  public static class FinanceStats {
    private BigDecimal totalSpentMonth;
    private BigDecimal nextRentDue;
    private List<java.util.Map<String, Object>> recentExpenses; // Simplified for UI
  }

}
