package com.webapp.domain.admin.dto;

import java.math.BigDecimal;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinancialOverviewDTO {
  private BigDecimal netRevenue;
  private BigDecimal avgBookingValue;
  private BigDecimal totalRefunds;
  private Map<String, Double> paymentMethodDistribution; // Method -> Percentage (0-100)

  // Month-over-Month changes
  private Double revenueChangePercentage;
  private Double avgValueChangePercentage;
}
