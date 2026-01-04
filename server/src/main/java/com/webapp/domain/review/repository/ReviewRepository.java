package com.webapp.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.webapp.domain.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

  long countByRating(Integer rating);

  @Query("SELECT AVG(r.rating) FROM Review r")
  Double getAverageRating();
}
