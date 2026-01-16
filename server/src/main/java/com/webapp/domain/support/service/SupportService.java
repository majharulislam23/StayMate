package com.webapp.domain.support.service;

import java.util.List;

import com.webapp.domain.support.dto.CreateTicketRequest;
import com.webapp.domain.support.dto.ReplyRequest;
import com.webapp.domain.support.dto.SupportTicketDto;
import com.webapp.domain.support.entity.TicketStatus;

public interface SupportService {
    SupportTicketDto createTicket(Long userId, CreateTicketRequest request);
    SupportTicketDto replyToTicket(Long userId, Long ticketId, ReplyRequest request);
    List<SupportTicketDto> getMyTickets(Long userId);
    List<SupportTicketDto> getAllTickets();
    SupportTicketDto getTicketDetails(Long userId, Long ticketId);
    SupportTicketDto updateStatus(Long ticketId, TicketStatus status);
}
