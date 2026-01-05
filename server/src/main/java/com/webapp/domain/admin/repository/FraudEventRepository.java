package com.webapp.domain.admin.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webapp.domain.admin.entity.FraudEvent;

@Repository
public interface FraudEventRepository extends JpaRepository<FraudEvent, Long> {

  @Query("SELECT f.type, f.severity, COUNT(f) FROM FraudEvent f WHERE f.createdAt > :since GROUP BY f.type, f.severity")
  List<Object[]> countByTypeAndSeveritySince(@Param("since") LocalDateTime since);

  List<FraudEvent> findAllByOrderByCreatedAtDesc();
}
