package com.webapp.domain.finance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.finance.entity.PayoutMethod;

@Repository
public interface PayoutMethodRepository extends JpaRepository<PayoutMethod, Long> {
  List<PayoutMethod> findByUserId(Long userId);

  Optional<PayoutMethod> findByUserIdAndIsDefaultTrue(Long userId);
}
