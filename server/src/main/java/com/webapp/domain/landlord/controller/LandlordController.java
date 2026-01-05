package com.webapp.domain.landlord.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.booking.dto.BookingResponse;
import com.webapp.domain.booking.enums.BookingStatus;
import com.webapp.domain.booking.service.BookingService;
import com.webapp.domain.landlord.dto.LandlordOverviewDto;
import com.webapp.domain.landlord.dto.PropertySeatSummaryDto;
import com.webapp.domain.landlord.service.LandlordService;
import com.webapp.domain.review.dto.ReviewResponse;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/landlord")
@RequiredArgsConstructor
public class LandlordController {

  private final LandlordService landlordService;
  private final UserService userService;
  private final BookingService bookingService;

  @GetMapping("/dashboard/overview")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<LandlordOverviewDto> getOverview(@AuthenticationPrincipal UserPrincipal currentUser) {
    User user = userService.getUserById(currentUser.getId());
    return ResponseEntity.ok(landlordService.getOverview(user));
  }

  @GetMapping("/properties/summary")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<List<PropertySeatSummaryDto>> getPropertySummaries(
      @AuthenticationPrincipal UserPrincipal currentUser) {
    User user = userService.getUserById(currentUser.getId());
    return ResponseEntity.ok(landlordService.getPropertySummaries(user));
  }

  @PatchMapping("/seats/{id}/availability")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<Void> toggleSeatAvailability(@AuthenticationPrincipal UserPrincipal currentUser,
      @PathVariable Long id) {
    User user = userService.getUserById(currentUser.getId());
    landlordService.toggleSeatAvailability(id, user);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/bookings")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<List<BookingResponse>> getBookings(@AuthenticationPrincipal UserPrincipal currentUser) {
    User user = userService.getUserById(currentUser.getId());
    return ResponseEntity.ok(landlordService.getBookingRequests(user));
  }

  @PatchMapping("/bookings/{id}/status")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<BookingResponse> updateBookingStatus(
      @AuthenticationPrincipal UserPrincipal currentUser,
      @PathVariable Long id,
      @RequestParam BookingStatus status) {

    return ResponseEntity.ok(bookingService.updateBookingStatus(currentUser.getId(), id, status));
  }

  @GetMapping("/reviews")
  @PreAuthorize("hasRole('HOUSE_OWNER')")
  public ResponseEntity<List<ReviewResponse>> getReviews(@AuthenticationPrincipal UserPrincipal currentUser) {
    User user = userService.getUserById(currentUser.getId());
    return ResponseEntity.ok(landlordService.getReviews(user));
  }
}
