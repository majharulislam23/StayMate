package com.webapp.domain.maintenance.dto;

import com.webapp.domain.maintenance.entity.MaintenanceRequest.Priority;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.RequestType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequestDTO {
  @NotNull
  private Long propertyId;

  @NotBlank
  private String title;

  @NotBlank
  private String description;

  private RequestType type;
  private Priority priority;
}
