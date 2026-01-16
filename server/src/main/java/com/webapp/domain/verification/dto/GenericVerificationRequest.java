package com.webapp.domain.verification.dto;

import lombok.Data;

@Data
public class GenericVerificationRequest {
  private String otp;
  private String phone;
}
