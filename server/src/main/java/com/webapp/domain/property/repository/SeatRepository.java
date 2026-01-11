package com.webapp.domain.property.repository;

import java.util.List;

import com.webapp.domain.property.enums.SeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.property.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByPropertyId(Long propertyId);

    void deleteByPropertyId(Long propertyId);

    long countByStatus(SeatStatus status);
}
