package com.webapp.domain.finance.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayoutMethodDto {
  private Long id;
  private String bankName;
  private String accountNumber; // Masked
  private String accountHolderName;
  private String routingNumber;
  private String currency;
  private boolean isDefault;
}
