package com.webapp.domain.admin.service;

import com.webapp.domain.user.entity.User;

public interface FraudService {
  void scanForDuplicateListings();

  void scanForSpamMessages();

  void scanForEmergencyMismatches();

  void checkUserActivity(User user);
}
