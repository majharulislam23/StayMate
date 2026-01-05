package com.webapp.domain.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerificationStats {
  private long pendingIdentity; // VerificationRequest PENDING
  private long pendingProperty; // Property Pending (if verified field is false?)
}
