package com.webapp.domain.finance.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webapp.domain.finance.entity.Earning;
import com.webapp.domain.finance.enums.EarningStatus;

@Repository
public interface EarningRepository extends JpaRepository<Earning, Long> {
  Page<Earning> findByUserId(Long userId, Pageable pageable);

  Optional<Earning> findByBooking(com.webapp.domain.booking.entity.Booking booking);

  List<Earning> findByUserIdAndStatus(Long userId, EarningStatus status);

  @Query("SELECT SUM(e.netAmount) FROM Earning e WHERE e.user.id = :userId AND e.status = :status")
  BigDecimal sumNetAmountByUserIdAndStatus(Long userId, EarningStatus status);

  @Query("SELECT SUM(e.netAmount) FROM Earning e WHERE e.user.id = :userId")
  BigDecimal sumTotalEarningsByUserId(Long userId);

  List<Earning> findByPayoutRequestId(Long payoutRequestId);
}
