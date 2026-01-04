package com.webapp.domain.maintenance.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceResponseDTO {
  private Long id;
  private Long propertyId;
  private String propertyTitle;
  private Long requesterId;
  private String requesterName;
  private Long assignedToId;
  private String assignedToName;
  private String title;
  private String description;
  private String type;
  private String priority;
  private String status;
  private String resolution;
  private LocalDateTime resolvedAt;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
