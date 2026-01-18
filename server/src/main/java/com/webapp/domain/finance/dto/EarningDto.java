package com.webapp.domain.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.webapp.domain.finance.enums.EarningStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EarningDto {
  private Long id;
  private Long bookingId;
  private String propertyTitle;
  private BigDecimal amount;
  private BigDecimal commission;
  private BigDecimal netAmount;
  private EarningStatus status;
  private LocalDateTime date;
}
