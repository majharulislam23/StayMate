package com.webapp.domain.finance.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PayoutMethodRequest {
  @NotBlank(message = "Bank Name is required")
  private String bankName;

  @NotBlank(message = "Account Number is required")
  private String accountNumber;

  @NotBlank(message = "Account Holder Name is required")
  private String accountHolderName;

  private String routingNumber;

  @NotBlank(message = "Currency is required")
  private String currency; // e.g. BDT
}
