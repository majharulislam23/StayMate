package com.webapp.domain.saved.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.saved.entity.SavedProperty;

@Repository
public interface SavedPropertyRepository extends JpaRepository<SavedProperty, Long> {

  List<SavedProperty> findByUserIdOrderBySavedAtDesc(Long userId);

  Optional<SavedProperty> findByUserIdAndPropertyId(Long userId, Long propertyId);

  boolean existsByUserIdAndPropertyId(Long userId, Long propertyId);

  void deleteByUserIdAndPropertyId(Long userId, Long propertyId);

  long countByUserId(Long userId);
}
