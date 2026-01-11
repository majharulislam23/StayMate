package com.webapp.domain.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Admin controller for user management operations.
 * All endpoints require ADMIN role.
 */
@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final com.webapp.domain.property.service.PropertyService propertyService;
    private final com.webapp.domain.verification.service.VerificationService verificationService;
    private final com.webapp.domain.report.service.ReportService reportService;
    private final com.webapp.domain.setting.service.SystemSettingService settingService;
    private final com.webapp.domain.booking.repository.BookingRepository bookingRepository;
    // bookingRepository is declared below but needs to be in constructor/Lombok
    // args
    // We will rely on Lombok @RequiredArgsConstructor but need to remove the field
    // declaration below and move it up,
    // OR just move it up now to be safe. I'll move it up.

    // ==================== Dashboard Stats ====================

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        log.info("Admin requesting dashboard stats");

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userService.countUsers());
        stats.put("totalHouseOwners", userService.countHouseOwners());
        stats.put("totalRegularUsers", userService.countRegularUsers());
        stats.put("totalAdmins", userService.countAdmins());
        stats.put("activeUsers", userService.countActiveUsers());
        stats.put("pendingVerifications", userService.countUnverifiedUsers());

        return ResponseEntity.ok(stats);
    }

    // ==================== Property Management ====================

    @GetMapping("/properties")
    public ResponseEntity<List<com.webapp.domain.property.dto.PropertyResponse>> getAllProperties() {
        log.info("Admin requesting all properties");
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    @PutMapping("/properties/{id}/approve")
    public ResponseEntity<com.webapp.domain.property.dto.PropertyResponse> approveProperty(@PathVariable Long id) {
        log.info("Admin approving property {}", id);
        return ResponseEntity.ok(propertyService.updatePropertyStatus(id, "Active"));
    }

    @PutMapping("/properties/{id}/reject")
    public ResponseEntity<com.webapp.domain.property.dto.PropertyResponse> rejectProperty(@PathVariable Long id) {
        log.info("Admin rejecting property {}", id);
        return ResponseEntity.ok(propertyService.updatePropertyStatus(id, "Rejected"));
    }

    // ==================== Analytics (Stub) ====================

    // ==================== Analytics (Real) ====================

    // ==================== Analytics (Real) handled in AdminAnalyticsController
    // ====================

    // ==================== Reports (Stub) ====================

    // ==================== Reports (Stub) ====================

    @GetMapping("/reports")
    public ResponseEntity<List<com.webapp.domain.report.entity.Report>> getReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @org.springframework.web.bind.annotation.PostMapping("/reports/{id}/resolve")
    public ResponseEntity<com.webapp.domain.report.entity.Report> resolveReport(
            @PathVariable @org.springframework.lang.NonNull Long id,
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body) {
        String notes = body.get("notes");
        return ResponseEntity.ok(reportService.resolveReport(id, notes));
    }

    @org.springframework.web.bind.annotation.PostMapping("/reports/{id}/dismiss")
    public ResponseEntity<com.webapp.domain.report.entity.Report> dismissReport(
            @PathVariable @org.springframework.lang.NonNull Long id,
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body) {
        String notes = body.get("notes");
        return ResponseEntity.ok(reportService.dismissReport(id, notes));
    }

    // ==================== Verifications (Stub) ====================

    @GetMapping("/verifications")
    public ResponseEntity<List<com.webapp.domain.verification.entity.VerificationRequest>> getVerifications() {
        return ResponseEntity.ok(verificationService.getAllRequests());
    }

    @PutMapping("/verifications/{id}/approve")
    public ResponseEntity<com.webapp.domain.verification.entity.VerificationRequest> approveVerification(
            @PathVariable @org.springframework.lang.NonNull Long id) {
        return ResponseEntity.ok(verificationService.approveRequest(id));
    }

    @PutMapping("/verifications/{id}/reject")
    public ResponseEntity<com.webapp.domain.verification.entity.VerificationRequest> rejectVerification(
            @PathVariable @org.springframework.lang.NonNull Long id,
            @org.springframework.web.bind.annotation.RequestParam String reason) {
        return ResponseEntity.ok(verificationService.rejectRequest(id, reason));
    }

    // ==================== Settings (Stub) ====================

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> getSettings() {
        return ResponseEntity.ok(settingService.getAllSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<Map<String, String>> updateSettings(
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> settings) {
        settingService.bulkUpdate(settings);
        return ResponseEntity.ok(settingService.getAllSettings());
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<Void> updateUserStatus(
            @PathVariable @org.springframework.lang.NonNull Long id,
            @org.springframework.web.bind.annotation.RequestParam com.webapp.domain.user.enums.AccountStatus status) {
        // Map User entity to UserResponse DTO required
        // Since we don't have a mapper here handy, we returns OK or generic response?
        // Let's use generic ResponseEntity.ok() with the user (serialized) if possible,
        // or simpler DTO.
        // Assuming User can be serialized or we just return ok.
        userService.updateAccountStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
