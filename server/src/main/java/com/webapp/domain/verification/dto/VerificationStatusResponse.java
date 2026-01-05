package com.webapp.domain.verification.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerificationStatusResponse {
  private boolean emailVerified;
  private boolean phoneVerified;
  private boolean profileComplete;
  private String documentStatus; // PENDING, APPROVED, REJECTED, NOT_UPLOADED
  private String rejectionReason;
}
