package com.webapp.domain.verification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.verification.entity.VerificationRequest;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationRequest, Long> {
  List<VerificationRequest> findByStatus(VerificationRequest.VerificationStatus status);

  List<VerificationRequest> findByUserId(Long userId);

  Optional<VerificationRequest> findByUserIdAndStatus(Long userId, VerificationRequest.VerificationStatus status);
}
