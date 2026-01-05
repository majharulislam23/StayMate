package com.webapp.domain.landlord.service;

import java.util.List;

import com.webapp.domain.booking.dto.BookingResponse;
import com.webapp.domain.landlord.dto.LandlordOverviewDto;
import com.webapp.domain.landlord.dto.PropertySeatSummaryDto;
import com.webapp.domain.user.entity.User;

public interface LandlordService {
  LandlordOverviewDto getOverview(User landlord);

  List<PropertySeatSummaryDto> getPropertySummaries(User landlord);

  void toggleSeatAvailability(Long seatId, User landlord);

  List<BookingResponse> getBookingRequests(User landlord);

  List<com.webapp.domain.review.dto.ReviewResponse> getReviews(User landlord);
}
