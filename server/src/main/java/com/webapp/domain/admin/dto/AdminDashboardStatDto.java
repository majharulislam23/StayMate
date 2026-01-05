package com.webapp.domain.admin.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStatDto {
  private VerificationStats verificationStats;
  private Map<String, Long> listingStats;
  private List<UserAcquisitionPoint> userAcquisition;
  private List<FraudEventDto> recentFraudEvents;
}
