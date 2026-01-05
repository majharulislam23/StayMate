package com.webapp.domain.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.admin.entity.Complaint;
import com.webapp.domain.admin.enums.ComplaintStatus;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

  List<Complaint> findByStatus(ComplaintStatus status);

  long countByStatus(ComplaintStatus status);

  List<Complaint> findAllByOrderByCreatedAtDesc();
}
