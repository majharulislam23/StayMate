package com.webapp.domain.user.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.booking.repository.BookingRepository;
import com.webapp.domain.messaging.repository.MessageRepository;
import com.webapp.domain.property.repository.PropertyRepository;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.enums.AccountStatus;
import com.webapp.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDeletionService {

  private final UserRepository userRepository;
  private final BookingRepository bookingRepository;
  private final PropertyRepository propertyRepository;
  private final MessageRepository messageRepository;

  private static final long DELETION_GRACE_PERIOD_DAYS = 3;

  @Transactional
  public void initiateDeletion(Long userId, Long adminId, String reason) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getAccountStatus() == AccountStatus.PENDING_DELETION) {
      throw new IllegalStateException("User is already pending deletion");
    }

    user.setAccountStatus(AccountStatus.PENDING_DELETION);
    user.setDeletionRequestedAt(LocalDateTime.now());
    user.setDeletionScheduledAt(LocalDateTime.now().plusDays(DELETION_GRACE_PERIOD_DAYS));
    user.setDeletedBy(adminId);
    user.setDeletionReason(reason);
    user.setEnabled(false); // Disable login

    userRepository.save(user);
    log.info("Deletion initiated for user {} by admin {}. Scheduled for {}", userId, adminId,
        user.getDeletionScheduledAt());

    // TODO: Send notification to user
  }

  @Transactional
  public void cancelDeletion(Long userId, Long adminId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getAccountStatus() != AccountStatus.PENDING_DELETION) {
      throw new IllegalStateException("User is not pending deletion");
    }

    user.setAccountStatus(AccountStatus.ACTIVE);
    user.setDeletionRequestedAt(null);
    user.setDeletionScheduledAt(null);
    user.setDeletedBy(null);
    user.setDeletionReason(null);
    user.setEnabled(true); // Re-enable login

    userRepository.save(user);
    log.info("Deletion cancelled for user {} by admin {}", userId, adminId);
  }

  @Transactional
  public void executeDeletion(User user) {
    log.info("Executing permanent deletion for user {}", user.getId());

    // Anonymize or delete related data
    // For simplicity in this iteration, we will delete related data that supports
    // it
    // and anonymize the user record itself to maintain integrity for
    // reports/analytics if needed
    // OR fully delete if business requirements permit.
    // The prompt asked for "Deletes or anonymizes".
    // Let's go with full deletion of dependent data and Marking User as DELETED
    // (Soft Delete style)
    // to preserve foreign keys in immutable logs if any, but standard practice is
    // often anonymization.

    // However, for "StayMate", cleaning up PII is key.

    // 1. Delete Bookings (Or we could keep them and nullify user, but let's assume
    // cleanup)
    // bookingRepository.deleteByUserId(user.getId()); // Need to check if this
    // exists or add it

    // 2. Delete Properties (if landlord)
    // propertyRepository.deleteByOwnerId(user.getId());

    // 3. Messages - usually kept but sender/receiver anonymized or marked deleted
    // messageRepository.deleteByUserId(user.getId());

    // For now, we will mark as DELETED and anonymize PII fields
    user.setFirstName("Deleted");
    user.setLastName("User");
    user.setEmail("deleted_" + user.getId() + "@staymate.com"); // Preserve uniqueness but anonymize
    user.setPhoneNumber(null);
    user.setProfilePictureUrl(null);
    user.setBio(null);
    user.setAddress(null);
    user.setCity(null);
    user.setPassword(null);
    user.setProviderId(null);

    user.setAccountStatus(AccountStatus.DELETED);
    user.setEnabled(false);
    user.setDeletionScheduledAt(null); // Clear schedule as it's done

    userRepository.save(user);
    log.info("User {} permanently deleted/anonymized", user.getId());
  }
}
