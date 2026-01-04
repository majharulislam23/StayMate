package com.webapp.domain.messaging.dto;

import com.webapp.domain.messaging.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    private Long conversationId;
    private Long recipientId;
    private String content;
    private MessageType messageType;
    private String attachmentUrl;
    private String attachmentName;
    private Long propertyId;
    private String propertyTitle;
    private String subject;
}
