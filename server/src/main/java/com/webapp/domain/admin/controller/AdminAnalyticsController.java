package com.webapp.domain.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.domain.admin.dto.AnalyticsDashboardData;
import com.webapp.domain.admin.dto.RevenuePoint;
import com.webapp.domain.admin.dto.UserAcquisitionPoint;
import com.webapp.domain.admin.service.AdminAnalyticsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
@Tag(name = "Admin Analytics", description = "Endpoints for admin dashboard analytics")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAnalyticsController {

  private final AdminAnalyticsService analyticsService;

  @Operation(summary = "Get user growth statistics")
  @GetMapping("/user-growth")
  public ResponseEntity<List<UserAcquisitionPoint>> getUserGrowth() {
    return ResponseEntity.ok(analyticsService.getUserGrowthStats());
  }

  @Operation(summary = "Get revenue statistics")
  @GetMapping("/revenue")
  public ResponseEntity<List<RevenuePoint>> getRevenue() {
    return ResponseEntity.ok(analyticsService.getRevenueStats());
  }

  @Operation(summary = "Get financial overview statistics")
  @GetMapping("/financial-overview")
  public ResponseEntity<com.webapp.domain.admin.dto.FinancialOverviewDTO> getFinancialOverview() {
    return ResponseEntity.ok(analyticsService.getFinancialOverview());
  }

  @Operation(summary = "Get full analytics dashboard data")
  @GetMapping("/dashboard")
  public ResponseEntity<AnalyticsDashboardData> getDashboardData() {
    return ResponseEntity.ok(analyticsService.getDashboardData());
  }
}
