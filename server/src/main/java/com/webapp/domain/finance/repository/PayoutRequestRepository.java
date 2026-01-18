package com.webapp.domain.finance.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.finance.entity.PayoutRequest;
import com.webapp.domain.finance.enums.PayoutStatus;

@Repository
public interface PayoutRequestRepository extends JpaRepository<PayoutRequest, Long> {
  Page<PayoutRequest> findByUserId(Long userId, Pageable pageable);

  Page<PayoutRequest> findByStatus(PayoutStatus status, Pageable pageable);
}
