package com.webapp.domain.user.dto;

import lombok.Data;

@Data
public class NotificationSettingRequest {
  private String type;
  private boolean enabled;
}
