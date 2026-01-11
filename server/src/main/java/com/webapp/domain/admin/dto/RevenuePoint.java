package com.webapp.domain.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenuePoint {
  private LocalDate date;
  private BigDecimal amount;
  private int transactionCount;
}
