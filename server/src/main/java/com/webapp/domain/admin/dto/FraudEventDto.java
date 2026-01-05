package com.webapp.domain.admin.dto;

import java.time.LocalDateTime;

import com.webapp.domain.admin.enums.FraudSeverity;
import com.webapp.domain.admin.enums.FraudType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FraudEventDto {
  private Long id;
  private Long userId;
  private String userName; // Optional
  private FraudType type;
  private FraudSeverity severity;
  private String metadata;
  private LocalDateTime createdAt;
}
