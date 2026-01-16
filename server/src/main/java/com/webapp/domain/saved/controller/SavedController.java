package com.webapp.domain.saved.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.saved.service.SavedService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/saved")
@RequiredArgsConstructor
public class SavedController {

  private final SavedService savedService;

  // Properties

  @GetMapping("/properties")
  public ResponseEntity<List<com.webapp.domain.property.dto.PropertyResponse>> getSavedProperties(
      @AuthenticationPrincipal UserPrincipal userPrincipal) {
    return ResponseEntity.ok(savedService.getSavedProperties(userPrincipal.getId()));
  }

  @PostMapping("/properties/{id}")
  public ResponseEntity<Map<String, String>> saveProperty(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    savedService.saveProperty(userPrincipal.getId(), id);
    return ResponseEntity.ok(Map.of("message", "Property saved successfully"));
  }

  @DeleteMapping("/properties/{id}")
  public ResponseEntity<Map<String, String>> removeProperty(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    savedService.removeProperty(userPrincipal.getId(), id);
    return ResponseEntity.ok(Map.of("message", "Property removed from saved"));
  }

  @GetMapping("/properties/{id}/check")
  public ResponseEntity<Map<String, Boolean>> isPropertySaved(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    return ResponseEntity.ok(Map.of("isSaved", savedService.isPropertySaved(userPrincipal.getId(), id)));
  }

  // Roommates

  @GetMapping("/roommates")
  public ResponseEntity<List<com.webapp.domain.roommate.RoommatePostDto>> getSavedRoommates(
      @AuthenticationPrincipal UserPrincipal userPrincipal) {
    return ResponseEntity.ok(savedService.getSavedRoommates(userPrincipal.getId()));
  }

  @PostMapping("/roommates/{id}")
  public ResponseEntity<Map<String, String>> saveRoommate(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    savedService.saveRoommate(userPrincipal.getId(), id);
    return ResponseEntity.ok(Map.of("message", "Roommate saved successfully"));
  }

  @DeleteMapping("/roommates/{id}")
  public ResponseEntity<Map<String, String>> removeRoommate(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    savedService.removeRoommate(userPrincipal.getId(), id);
    return ResponseEntity.ok(Map.of("message", "Roommate removed from saved"));
  }

  @GetMapping("/roommates/{id}/check")
  public ResponseEntity<Map<String, Boolean>> isRoommateSaved(@AuthenticationPrincipal UserPrincipal userPrincipal,
      @PathVariable Long id) {
    return ResponseEntity.ok(Map.of("isSaved", savedService.isRoommateSaved(userPrincipal.getId(), id)));
  }
}
