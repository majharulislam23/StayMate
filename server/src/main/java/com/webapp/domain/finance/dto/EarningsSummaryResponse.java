package com.webapp.domain.finance.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EarningsSummaryResponse {
  private BigDecimal totalEarnings;
  private BigDecimal pendingEarnings;
  private BigDecimal availableBalance;
  private BigDecimal paidOutEarnings;
}
