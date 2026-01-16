package com.webapp.domain.support.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.support.dto.CreateTicketRequest;
import com.webapp.domain.support.dto.ReplyRequest;
import com.webapp.domain.support.dto.SupportTicketDto;
import com.webapp.domain.support.entity.TicketStatus;
import com.webapp.domain.support.service.SupportService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SupportController {

  private final SupportService supportService;

  @PostMapping
  public ResponseEntity<SupportTicketDto> createTicket(
      @AuthenticationPrincipal UserPrincipal userPrincipal,
      @Valid @RequestBody CreateTicketRequest request) {
    return ResponseEntity.ok(supportService.createTicket(userPrincipal.getId(), request));
  }

  @GetMapping("/my-tickets")
  public ResponseEntity<List<SupportTicketDto>> getMyTickets(
      @AuthenticationPrincipal UserPrincipal userPrincipal) {
    return ResponseEntity.ok(supportService.getMyTickets(userPrincipal.getId()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<SupportTicketDto> getTicketDetails(
      @AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    return ResponseEntity.ok(supportService.getTicketDetails(userPrincipal.getId(), id));
  }

  @PostMapping("/{id}/reply")
  public ResponseEntity<SupportTicketDto> replyToTicket(
      @AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id,
      @Valid @RequestBody ReplyRequest request) {
    return ResponseEntity.ok(supportService.replyToTicket(userPrincipal.getId(), id, request));
  }

  // Admin Endpoints

  @GetMapping("/admin/all")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<SupportTicketDto>> getAllTickets() {
    return ResponseEntity.ok(supportService.getAllTickets());
  }

  @PutMapping("/admin/{id}/status")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<SupportTicketDto> updateStatus(
      @PathVariable Long id,
      @RequestParam TicketStatus status) {
    return ResponseEntity.ok(supportService.updateStatus(id, status));
  }
}
