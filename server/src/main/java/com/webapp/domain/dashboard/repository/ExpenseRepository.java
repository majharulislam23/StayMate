package com.webapp.domain.dashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.dashboard.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findByPropertyId(Long propertyId);

  List<Expense> findByPayerId(Long payerId);
}
