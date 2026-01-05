package com.webapp.domain.property.dto;

import com.webapp.domain.property.enums.SeatStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatDto {
  private Long id;
  private String label;
  private SeatStatus status; // The PERSISTED status (e.g. BLOCKED)
  private boolean isOccupiedByBooking; // Calculated status
}
