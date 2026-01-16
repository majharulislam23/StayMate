package com.webapp.domain.support.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReplyRequest {
  @NotBlank
  private String message;
}
