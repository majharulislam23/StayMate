package com.webapp.domain.support.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.webapp.domain.support.entity.TicketPriority;
import com.webapp.domain.support.entity.TicketStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicketDto {
  private Long id;
  private String subject;
  private String category;
  private TicketStatus status;
  private TicketPriority priority;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // User info for Admin view
  private Long userId;
  private String userName;
  private String userEmail;
  private String userAvatar;

  // Detailed view
  private List<SupportMessageDto> messages;
}
