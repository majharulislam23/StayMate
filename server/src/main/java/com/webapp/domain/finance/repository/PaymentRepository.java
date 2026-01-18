package com.webapp.domain.finance.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.finance.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
  Page<Payment> findByUserId(Long userId, Pageable pageable);

  Optional<Payment> findByBookingId(Long bookingId);

  @org.springframework.data.jpa.repository.Query("SELECT SUM(p.amount) FROM Payment p WHERE p.user.id = :userId AND p.status = 'COMPLETED'")
  java.math.BigDecimal sumTotalSpentByUserId(Long userId);
}
