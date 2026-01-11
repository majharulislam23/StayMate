package com.webapp.domain.admin.service;

import java.util.List;

import com.webapp.domain.admin.dto.AnalyticsDashboardData;
import com.webapp.domain.admin.dto.FinancialOverviewDTO;
import com.webapp.domain.admin.dto.RevenuePoint;
import com.webapp.domain.admin.dto.UserAcquisitionPoint;

public interface AdminAnalyticsService {
  List<UserAcquisitionPoint> getUserGrowthStats();

  List<RevenuePoint> getRevenueStats();

  FinancialOverviewDTO getFinancialOverview();

  AnalyticsDashboardData getDashboardData();
}
