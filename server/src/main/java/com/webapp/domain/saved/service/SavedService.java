package com.webapp.domain.saved.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.property.entity.Property;
import com.webapp.domain.property.repository.PropertyRepository;
import com.webapp.domain.roommate.RoommatePost;
import com.webapp.domain.roommate.RoommatePostRepository;
import com.webapp.domain.saved.entity.SavedProperty;
import com.webapp.domain.saved.entity.SavedRoommate;
import com.webapp.domain.saved.repository.SavedPropertyRepository;
import com.webapp.domain.saved.repository.SavedRoommateRepository;
import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SavedService {

  private final SavedPropertyRepository savedPropertyRepository;
  private final SavedRoommateRepository savedRoommateRepository;
  private final UserService userService;
  private final PropertyRepository propertyRepository;
  private final RoommatePostRepository roommatePostRepository;
  private final com.webapp.domain.property.mapper.PropertyMapper propertyMapper;
  private final com.webapp.domain.roommate.RoommatePostMapper roommatePostMapper;

  // Saved Properties

  @Transactional(readOnly = true)
  public List<com.webapp.domain.property.dto.PropertyResponse> getSavedProperties(Long userId) {
    return savedPropertyRepository.findByUserIdOrderBySavedAtDesc(userId).stream()
        .map(saved -> {
          Property property = saved.getProperty();
          com.webapp.domain.property.dto.PropertyResponse response = propertyMapper.toResponse(property);
          response.setSaved(true);
          return response;
        })
        .collect(Collectors.toList());
  }

  @Transactional
  public void saveProperty(Long userId, Long propertyId) {
    if (savedPropertyRepository.existsByUserIdAndPropertyId(userId, propertyId)) {
      return; // Already saved
    }

    User user = userService.getUserById(userId);
    Property property = propertyRepository.findById(propertyId)
        .orElseThrow(() -> new RuntimeException("Property not found"));

    SavedProperty savedProperty = SavedProperty.builder()
        .user(user)
        .property(property)
        .build();

    savedPropertyRepository.save(savedProperty);
  }

  @Transactional
  public void removeProperty(Long userId, Long propertyId) {
    savedPropertyRepository.deleteByUserIdAndPropertyId(userId, propertyId);
  }

  @Transactional(readOnly = true)
  public boolean isPropertySaved(Long userId, Long propertyId) {
    return savedPropertyRepository.existsByUserIdAndPropertyId(userId, propertyId);
  }

  // Saved Roommates

  @Transactional(readOnly = true)
  public List<com.webapp.domain.roommate.RoommatePostDto> getSavedRoommates(Long userId) {
    return savedRoommateRepository.findByUserIdOrderBySavedAtDesc(userId).stream()
        .map(saved -> {
          RoommatePost post = saved.getRoommatePost();
          com.webapp.domain.roommate.RoommatePostDto response = roommatePostMapper.toDto(post);
          response.setSaved(true);
          return response;
        })
        .collect(Collectors.toList());
  }

  @Transactional
  public void saveRoommate(Long userId, Long roommatePostId) {
    if (savedRoommateRepository.existsByUserIdAndRoommatePostId(userId, roommatePostId)) {
      return; // Already saved
    }

    User user = userService.getUserById(userId);
    RoommatePost roommatePost = roommatePostRepository.findById(roommatePostId)
        .orElseThrow(() -> new RuntimeException("Roommate post not found"));

    SavedRoommate savedRoommate = SavedRoommate.builder()
        .user(user)
        .roommatePost(roommatePost)
        .build();

    savedRoommateRepository.save(savedRoommate);
  }

  @Transactional
  public void removeRoommate(Long userId, Long roommatePostId) {
    savedRoommateRepository.deleteByUserIdAndRoommatePostId(userId, roommatePostId);
  }

  @Transactional(readOnly = true)
  public boolean isRoommateSaved(Long userId, Long roommatePostId) {
    return savedRoommateRepository.existsByUserIdAndRoommatePostId(userId, roommatePostId);
  }
}
