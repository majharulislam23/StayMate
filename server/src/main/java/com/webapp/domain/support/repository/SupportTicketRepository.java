package com.webapp.domain.support.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.support.entity.SupportTicket;
import com.webapp.domain.support.entity.TicketStatus;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
  List<SupportTicket> findByUserIdOrderByUpdatedAtDesc(Long userId);

  List<SupportTicket> findByStatusOrderByUpdatedAtDesc(TicketStatus status);

  List<SupportTicket> findAllByOrderByUpdatedAtDesc();
}
