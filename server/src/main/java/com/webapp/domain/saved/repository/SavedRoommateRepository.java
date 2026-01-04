package com.webapp.domain.saved.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.saved.entity.SavedRoommate;

@Repository
public interface SavedRoommateRepository extends JpaRepository<SavedRoommate, Long> {

  List<SavedRoommate> findByUserIdOrderBySavedAtDesc(Long userId);

  Optional<SavedRoommate> findByUserIdAndRoommatePostId(Long userId, Long roommatePostId);

  boolean existsByUserIdAndRoommatePostId(Long userId, Long roommatePostId);

  void deleteByUserIdAndRoommatePostId(Long userId, Long roommatePostId);

  long countByUserId(Long userId);
}
