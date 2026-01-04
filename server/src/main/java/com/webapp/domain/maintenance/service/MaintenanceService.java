package com.webapp.domain.maintenance.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.audit.service.AuditService;
import com.webapp.domain.maintenance.dto.MaintenanceRequestDTO;
import com.webapp.domain.maintenance.dto.MaintenanceResponseDTO;
import com.webapp.domain.maintenance.entity.MaintenanceRequest;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.Priority;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.RequestType;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.Status;
import com.webapp.domain.maintenance.repository.MaintenanceRequestRepository;
import com.webapp.domain.notification.enums.NotificationType;
import com.webapp.domain.notification.service.NotificationService;
import com.webapp.domain.property.entity.Property;
import com.webapp.domain.property.repository.PropertyRepository;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MaintenanceService {

  private final MaintenanceRequestRepository requestRepository;
  private final PropertyRepository propertyRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final AuditService auditService;

  @Transactional
  public MaintenanceResponseDTO createRequest(Long userId, MaintenanceRequestDTO dto) {
    User requester = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Property property = propertyRepository.findById(dto.getPropertyId())
        .orElseThrow(() -> new IllegalArgumentException("Property not found"));

    MaintenanceRequest request = MaintenanceRequest.builder()
        .property(property)
        .requester(requester)
        .title(dto.getTitle())
        .description(dto.getDescription())
        .type(dto.getType() != null ? dto.getType() : RequestType.MAINTENANCE)
        .priority(dto.getPriority() != null ? dto.getPriority() : Priority.MEDIUM)
        .status(Status.OPEN)
        .build();

    MaintenanceRequest saved = requestRepository.save(request);

    // Notify property owner
    notificationService.createNotificationForUser(
        property.getOwner().getId(),
        NotificationType.GENERAL,
        "New Maintenance Request",
        "New " + dto.getType() + " request for " + property.getTitle(),
        "/maintenance/" + saved.getId());

    // Audit log
    auditService.log(userId, AuditService.AuditAction.ADMIN_ACTION, "MaintenanceRequest", saved.getId());

    return toResponse(saved);
  }

  @Transactional(readOnly = true)
  public Page<MaintenanceResponseDTO> getMyRequests(Long userId, Pageable pageable) {
    return requestRepository.findByRequesterId(userId, pageable).map(this::toResponse);
  }

  @Transactional(readOnly = true)
  public Page<MaintenanceResponseDTO> getRequestsForOwner(Long ownerId, Pageable pageable) {
    return requestRepository.findByPropertyOwnerId(ownerId, pageable).map(this::toResponse);
  }

  @Transactional(readOnly = true)
  public MaintenanceResponseDTO getRequest(Long id) {
    return requestRepository.findById(id)
        .map(this::toResponse)
        .orElseThrow(() -> new IllegalArgumentException("Request not found"));
  }

  @Transactional
  public MaintenanceResponseDTO updateStatus(Long userId, Long requestId, Status status, String resolution) {
    MaintenanceRequest request = requestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Request not found"));

    // Verify authorized (owner or admin)
    if (!request.getProperty().getOwner().getId().equals(userId)) {
      throw new SecurityException("Not authorized to update this request");
    }

    request.setStatus(status);
    if (resolution != null) {
      request.setResolution(resolution);
    }
    if (status == Status.RESOLVED || status == Status.CLOSED) {
      request.setResolvedAt(LocalDateTime.now());
    }

    MaintenanceRequest saved = requestRepository.save(request);

    // Notify requester
    notificationService.createNotificationForUser(
        request.getRequester().getId(),
        NotificationType.GENERAL,
        "Request Updated",
        "Your request \"" + request.getTitle() + "\" is now " + status,
        "/maintenance/" + requestId);

    return toResponse(saved);
  }

  @Transactional
  public void deleteRequest(Long userId, Long requestId) {
    MaintenanceRequest request = requestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Request not found"));

    if (!request.getRequester().getId().equals(userId) &&
        !request.getProperty().getOwner().getId().equals(userId)) {
      throw new SecurityException("Not authorized");
    }

    requestRepository.delete(request);
  }

  private MaintenanceResponseDTO toResponse(MaintenanceRequest request) {
    return MaintenanceResponseDTO.builder()
        .id(request.getId())
        .propertyId(request.getProperty().getId())
        .propertyTitle(request.getProperty().getTitle())
        .requesterId(request.getRequester().getId())
        .requesterName(request.getRequester().getFirstName() + " " + request.getRequester().getLastName())
        .assignedToId(request.getAssignedTo() != null ? request.getAssignedTo().getId() : null)
        .assignedToName(request.getAssignedTo() != null
            ? request.getAssignedTo().getFirstName() + " " + request.getAssignedTo().getLastName()
            : null)
        .title(request.getTitle())
        .description(request.getDescription())
        .type(request.getType().name())
        .priority(request.getPriority().name())
        .status(request.getStatus().name())
        .resolution(request.getResolution())
        .resolvedAt(request.getResolvedAt())
        .createdAt(request.getCreatedAt())
        .updatedAt(request.getUpdatedAt())
        .build();
  }
}
