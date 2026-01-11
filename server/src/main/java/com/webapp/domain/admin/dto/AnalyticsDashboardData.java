package com.webapp.domain.admin.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDashboardData {
  private List<UserAcquisitionPoint> userGrowth;
  private List<RevenuePoint> revenueTrends;
  private List<RevenuePoint> dailyRevenue;
  private Long totalRevenue;
  private Long activeListings;
  private Double occupancyRate;
}
