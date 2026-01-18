package com.webapp.domain.finance.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
  private Long id;
  private Long bookingId;
  private String propertyTitle;
  private BigDecimal amount;
  private String status;
  private LocalDateTime date;
  private String paymentMethod;
}
