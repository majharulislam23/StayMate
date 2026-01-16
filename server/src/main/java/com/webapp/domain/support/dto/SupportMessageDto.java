package com.webapp.domain.support.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportMessageDto {
  private Long id;
  private Long senderId;
  private String senderName;
  private String senderAvatar;
  private boolean isAdminReply;
  private String content;
  private LocalDateTime sentAt;
}
