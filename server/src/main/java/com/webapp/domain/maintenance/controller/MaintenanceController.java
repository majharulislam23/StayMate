package com.webapp.domain.maintenance.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.maintenance.dto.MaintenanceRequestDTO;
import com.webapp.domain.maintenance.dto.MaintenanceResponseDTO;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.Status;
import com.webapp.domain.maintenance.service.MaintenanceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

  private final MaintenanceService maintenanceService;

  @PostMapping
  public ResponseEntity<MaintenanceResponseDTO> createRequest(
      @AuthenticationPrincipal UserPrincipal user,
      @Valid @RequestBody MaintenanceRequestDTO request) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(maintenanceService.createRequest(user.getId(), request));
  }

  @GetMapping("/my-requests")
  public ResponseEntity<Page<MaintenanceResponseDTO>> getMyRequests(
      @AuthenticationPrincipal UserPrincipal user,
      @PageableDefault(size = 20) Pageable pageable) {
    return ResponseEntity.ok(maintenanceService.getMyRequests(user.getId(), pageable));
  }

  @GetMapping("/property-requests")
  public ResponseEntity<Page<MaintenanceResponseDTO>> getPropertyRequests(
      @AuthenticationPrincipal UserPrincipal user,
      @PageableDefault(size = 20) Pageable pageable) {
    return ResponseEntity.ok(maintenanceService.getRequestsForOwner(user.getId(), pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<MaintenanceResponseDTO> getRequest(@PathVariable Long id) {
    return ResponseEntity.ok(maintenanceService.getRequest(id));
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<MaintenanceResponseDTO> updateStatus(
      @AuthenticationPrincipal UserPrincipal user,
      @PathVariable Long id,
      @RequestParam Status status,
      @RequestParam(required = false) String resolution) {
    return ResponseEntity.ok(maintenanceService.updateStatus(user.getId(), id, status, resolution));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteRequest(
      @AuthenticationPrincipal UserPrincipal user,
      @PathVariable Long id) {
    maintenanceService.deleteRequest(user.getId(), id);
    return ResponseEntity.noContent().build();
  }
}
