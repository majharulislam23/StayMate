package com.webapp.domain.support.dto;

import com.webapp.domain.support.entity.TicketPriority;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTicketRequest {
  @NotBlank
  private String subject;

  @NotBlank
  private String category;

  @NotBlank
  private String message; // Initial message

  private TicketPriority priority = TicketPriority.MEDIUM;
}
