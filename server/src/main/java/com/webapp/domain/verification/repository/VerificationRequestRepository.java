package com.webapp.domain.verification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.verification.entity.VerificationRequest;

@Repository
public interface VerificationRequestRepository extends JpaRepository<VerificationRequest, Long> {

  // Check if user has an approved verification request of specific types
  boolean existsByUserIdAndStatusAndDocumentTypeIn(Long userId,
      VerificationRequest.VerificationStatus status,
      List<String> documentTypes);

  // Count pending requests (for Admin Dashboard)
  long countByStatus(VerificationRequest.VerificationStatus status);
}
