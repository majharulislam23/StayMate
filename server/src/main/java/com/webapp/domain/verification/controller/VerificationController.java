package com.webapp.domain.verification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.file.service.FileStorageService;
import com.webapp.domain.verification.dto.GenericVerificationRequest;
import com.webapp.domain.verification.dto.PhoneVerificationRequest;
import com.webapp.domain.verification.dto.VerificationStatusResponse;
import com.webapp.domain.verification.entity.VerificationRequest;
import com.webapp.domain.verification.service.VerificationService;

import lombok.RequiredArgsConstructor;

@lombok.extern.slf4j.Slf4j
@RestController
@RequestMapping("/api/verification")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;
    private final FileStorageService fileStorageService;

    @GetMapping("/admin/pending")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<java.util.List<VerificationRequest>> getPendingRequests() {
        return ResponseEntity.ok(verificationService.getPendingRequests());
    }

    @PostMapping("/admin/{id}/approve")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VerificationRequest> approveRequest(
            @org.springframework.web.bind.annotation.PathVariable Long id) {
        return ResponseEntity.ok(verificationService.approveRequest(id));
    }

    @PostMapping("/admin/{id}/reject")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VerificationRequest> rejectRequest(
            @org.springframework.web.bind.annotation.PathVariable Long id,
            @RequestBody java.util.Map<String, String> body) {
        String reason = body.get("reason");
        return ResponseEntity.ok(verificationService.rejectRequest(id, reason));
    }

    @GetMapping("/status")
    public ResponseEntity<VerificationStatusResponse> getStatus(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        log.debug("VerificationController.getStatus called");
        if (userPrincipal == null) {
            log.error("UserPrincipal is NULL in VerificationController!");
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        } else {
            log.debug("UserPrincipal injected: ID={}, Email={}, Class={}",
                    userPrincipal.getId(), userPrincipal.getEmail(), userPrincipal.getClass().getName());
        }
        return ResponseEntity.ok(verificationService.getVerificationStatus(userPrincipal.getId()));
    }

    @PostMapping("/phone")
    public ResponseEntity<?> requestPhoneVerification(@RequestBody PhoneVerificationRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (request.getPhoneNumber() == null)
            return ResponseEntity.badRequest().body("Phone number required");

        try {
            String otp = verificationService.initiatePhoneVerification(userPrincipal.getId(), request.getPhoneNumber());
            // returning OTP for dev purposes
            return ResponseEntity.ok(java.util.Map.of("message", "OTP sent", "otp", otp));
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            // Unwrap "Error initiating..." prefix if present
            if (errorMessage.contains("Error initiating phone verification: ")) {
                errorMessage = errorMessage.replace("Error initiating phone verification: ", "");
            }

            // Returns JSON error message
            return ResponseEntity.badRequest().body(java.util.Map.of(
                    "message", errorMessage));
        }
    }

    /**
     * Verifies phone with OTP; returns success/failure
     */
    @PostMapping("/phone/verify")
    public ResponseEntity<?> verifyPhone(@RequestBody GenericVerificationRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (request.getOtp() == null)
            return ResponseEntity.badRequest().body("OTP required");

        boolean verified = verificationService.verifyPhone(userPrincipal.getId(), request.getOtp());
        if (verified) {
            return ResponseEntity.ok(java.util.Map.of("message", "Phone verified"));
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVerificationDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @AuthenticationPrincipal com.webapp.auth.security.UserPrincipal userPrincipal) {

        // storeFile now returns the full MinIO URL
        String fileUrl = fileStorageService.storeFile(file);

        VerificationRequest request = verificationService.submitRequest(userPrincipal.getId(), fileUrl, documentType);

        return ResponseEntity.ok(request);
    }
}
