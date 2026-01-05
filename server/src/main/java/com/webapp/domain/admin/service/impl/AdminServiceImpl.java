package com.webapp.domain.admin.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.admin.dto.AdminDashboardStatDto;
import com.webapp.domain.admin.dto.FraudEventDto;
import com.webapp.domain.admin.dto.UserAcquisitionPoint;
import com.webapp.domain.admin.dto.VerificationStats;
import com.webapp.domain.admin.entity.FraudEvent;
import com.webapp.domain.admin.repository.FraudEventRepository;
import com.webapp.domain.admin.service.AdminService;
import com.webapp.domain.property.repository.PropertyRepository;
import com.webapp.domain.user.repository.UserRepository;
import com.webapp.domain.verification.entity.VerificationRequest.VerificationStatus;
import com.webapp.domain.verification.repository.VerificationRequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

  private final VerificationRequestRepository verificationRequestRepository;
  private final PropertyRepository propertyRepository;
  private final UserRepository userRepository;
  private final FraudEventRepository fraudEventRepository;

  @Override
  @Transactional(readOnly = true)
  public AdminDashboardStatDto getDashboardStats() {
    // 1. Verification Stats
    long pendingIdentity = verificationRequestRepository.countByStatus(VerificationStatus.PENDING);
    long pendingProperties = propertyRepository.countByStatus("Pending");

    VerificationStats verificationStats = VerificationStats.builder()
        .pendingIdentity(pendingIdentity)
        .pendingProperty(pendingProperties)
        .build();

    // 2. Listing Stats
    List<Object[]> statusCounts = propertyRepository.countByStatusGrouped();
    Map<String, Long> listingStats = new HashMap<>();
    for (Object[] row : statusCounts) {
      String status = (String) row[0];
      Long count = (Long) row[1];
      listingStats.put(status, count);
    }

    // 3. User Acquisition
    List<Object[]> userStats = userRepository.getUserAcquisitionStats();
    List<UserAcquisitionPoint> userAcquisition = new ArrayList<>();
    for (Object[] row : userStats) {
      // row[0] is Date, row[1] is RoleName (Enum), row[2] is Count
      userAcquisition.add(UserAcquisitionPoint.builder()
          .date(row[0].toString())
          .role(row[1].toString())
          .count((Long) row[2])
          .build());
    }

    // 4. Recent Fraud Events
    List<FraudEvent> events = fraudEventRepository.findAllByOrderByCreatedAtDesc();
    List<FraudEventDto> fraudEvents = events.stream()
        .limit(50)
        .map(this::mapToFraudDto)
        .collect(Collectors.toList());

    return AdminDashboardStatDto.builder()
        .verificationStats(verificationStats)
        .listingStats(listingStats)
        .userAcquisition(userAcquisition)
        .recentFraudEvents(fraudEvents)
        .build();
  }

  private FraudEventDto mapToFraudDto(FraudEvent event) {
    return FraudEventDto.builder()
        .id(event.getId())
        .userId(event.getUser().getId())
        .userName(event.getUser().getFullName())
        .type(event.getType())
        .severity(event.getSeverity())
        .metadata(event.getMetadata())
        .createdAt(event.getCreatedAt())
        .build();
  }
}
