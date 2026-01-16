package com.webapp.domain.support.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.support.dto.CreateTicketRequest;
import com.webapp.domain.support.dto.ReplyRequest;
import com.webapp.domain.support.dto.SupportMessageDto;
import com.webapp.domain.support.dto.SupportTicketDto;
import com.webapp.domain.support.entity.SupportMessage;
import com.webapp.domain.support.entity.SupportTicket;
import com.webapp.domain.support.entity.TicketStatus;
import com.webapp.domain.support.repository.SupportTicketRepository;
import com.webapp.domain.support.service.SupportService;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService {

  private final SupportTicketRepository ticketRepository;
  private final UserRepository userRepository;

  @Transactional
  public SupportTicketDto createTicket(Long userId, CreateTicketRequest request) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    SupportTicket ticket = SupportTicket.builder()
        .user(user)
        .subject(request.getSubject())
        .category(request.getCategory())
        .priority(request.getPriority())
        .status(TicketStatus.OPEN)
        .build();

    SupportMessage initialMessage = SupportMessage.builder()
        .ticket(ticket)
        .sender(user)
        .content(request.getMessage())
        .isAdminReply(false)
        .build();

    ticket.getMessages().add(initialMessage);

    SupportTicket saved = ticketRepository.save(ticket);
    return mapToDto(saved, true);
  }

  @Transactional
  public SupportTicketDto replyToTicket(Long userId, Long ticketId, ReplyRequest request) {
    SupportTicket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("Ticket not found"));

    User sender = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    boolean isAdmin = sender.isAdmin();

    // Validate access
    if (!isAdmin && !ticket.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized");
    }

    SupportMessage message = SupportMessage.builder()
        .ticket(ticket)
        .sender(sender)
        .content(request.getMessage())
        .isAdminReply(isAdmin)
        .build();

    ticket.getMessages().add(message);

    // Update status if needed
    if (isAdmin && ticket.getStatus() == TicketStatus.OPEN) {
      ticket.setStatus(TicketStatus.IN_PROGRESS);
    } else if (!isAdmin && (ticket.getStatus() == TicketStatus.RESOLVED || ticket.getStatus() == TicketStatus.CLOSED)) {
      ticket.setStatus(TicketStatus.OPEN); // Re-open on user reply
    }

    SupportTicket saved = ticketRepository.save(ticket);
    return mapToDto(saved, true);
  }

  @Transactional(readOnly = true)
  public List<SupportTicketDto> getMyTickets(Long userId) {
    return ticketRepository.findByUserIdOrderByUpdatedAtDesc(userId).stream()
        .map(t -> mapToDto(t, false))
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<SupportTicketDto> getAllTickets() {
    return ticketRepository.findAllByOrderByUpdatedAtDesc().stream()
        .map(t -> mapToDto(t, false))
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public SupportTicketDto getTicketDetails(Long userId, Long ticketId) {
    SupportTicket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("Ticket not found"));

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    boolean isAdmin = user.isAdmin();

    if (!isAdmin && !ticket.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized");
    }

    return mapToDto(ticket, true);
  }

  @Transactional
  public SupportTicketDto updateStatus(Long ticketId, TicketStatus status) {
    SupportTicket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> new RuntimeException("Ticket not found"));

    ticket.setStatus(status);
    return mapToDto(ticketRepository.save(ticket), true);
  }

  private SupportTicketDto mapToDto(SupportTicket ticket, boolean includeMessages) {
    List<SupportMessageDto> messages = null;
    if (includeMessages && ticket.getMessages() != null) {
      messages = ticket.getMessages().stream()
          .map(m -> SupportMessageDto.builder()
              .id(m.getId())
              .senderId(m.getSender().getId())
              .senderName(m.getSender().getFirstName() + " " + m.getSender().getLastName())
              .senderAvatar(m.getSender().getProfilePictureUrl())
              .isAdminReply(m.isAdminReply())
              .content(m.getContent())
              .sentAt(m.getSentAt())
              .build())
          .collect(Collectors.toList());
    }

    return SupportTicketDto.builder()
        .id(ticket.getId())
        .subject(ticket.getSubject())
        .category(ticket.getCategory())
        .status(ticket.getStatus())
        .priority(ticket.getPriority())
        .createdAt(ticket.getCreatedAt())
        .updatedAt(ticket.getUpdatedAt())
        .userId(ticket.getUser().getId())
        .userName(ticket.getUser().getFirstName() + " " + ticket.getUser().getLastName())
        .userEmail(ticket.getUser().getEmail())
        .userAvatar(ticket.getUser().getProfilePictureUrl())
        .messages(messages)
        .build();
  }
}
