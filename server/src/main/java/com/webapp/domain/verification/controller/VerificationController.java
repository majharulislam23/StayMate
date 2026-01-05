package com.webapp.domain.verification.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.webapp.domain.user.entity.User;
import com.webapp.domain.verification.dto.VerificationStatusResponse;
import com.webapp.domain.verification.entity.VerificationRequest;
import com.webapp.domain.verification.service.VerificationService;
import com.webapp.service.FileStorageService;

import lombok.RequiredArgsConstructor;

// Request body DTOs
class PhoneVerificationRequest {
  public String phoneNumber;
}

class GenericVerificationRequest {
  public String otp;
  public String phone;
}

@RestController
@RequestMapping("/api/verification")
@RequiredArgsConstructor
public class VerificationController {

  private final VerificationService verificationService;
  private final FileStorageService fileStorageService;

  @GetMapping("/status")
  public ResponseEntity<VerificationStatusResponse> getStatus(Principal principal) {
    User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    return ResponseEntity.ok(verificationService.getVerificationStatus(user.getId()));
  }

  @PostMapping("/phone")
  public ResponseEntity<?> requestPhoneVerification(@RequestBody PhoneVerificationRequest request,
      Principal principal) {
    User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    if (request.phoneNumber == null)
      return ResponseEntity.badRequest().body("Phone number required");

    String otp = verificationService.initiatePhoneVerification(user.getId(), request.phoneNumber);
    // returning OTP for dev purposes
    return ResponseEntity.ok(java.util.Map.of("message", "OTP sent", "otp", otp));
  }

  @PostMapping("/phone/verify")
  public ResponseEntity<?> verifyPhone(@RequestBody GenericVerificationRequest request, Principal principal) {
    User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
    if (request.otp == null)
      return ResponseEntity.badRequest().body("OTP required");

    boolean verified = verificationService.verifyPhone(user.getId(), request.otp);
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
      Principal principal) {

    User user = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();

    String fileName = fileStorageService.storeFile(file);
    String fileUrl = "/api/uploads/" + fileName; // Assuming we will have an endpoint or just storing path reference

    VerificationRequest request = verificationService.submitRequest(user.getId(), fileUrl, documentType);

    return ResponseEntity.ok(request);
  }
}
