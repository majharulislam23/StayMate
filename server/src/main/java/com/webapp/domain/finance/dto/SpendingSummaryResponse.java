package com.webapp.domain.finance.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpendingSummaryResponse {
  private BigDecimal totalSpent;
}
