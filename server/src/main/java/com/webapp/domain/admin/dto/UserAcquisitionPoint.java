package com.webapp.domain.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAcquisitionPoint {
  private String date;
  private String role;
  private long count;
}
