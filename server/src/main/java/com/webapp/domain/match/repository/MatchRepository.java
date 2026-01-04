package com.webapp.domain.match.repository;

import com.webapp.domain.match.entity.Match;
import com.webapp.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query("SELECT m FROM Match m WHERE m.user1 = :user OR m.user2 = :user")
    Page<Match> findByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT m FROM Match m WHERE (m.user1 = :user1 AND m.user2 = :user2) OR (m.user1 = :user2 AND m.user2 = :user1)")
    Optional<Match> findByUsers(@Param("user1") User user1, @Param("user2") User user2);

    @org.springframework.data.jpa.repository.Modifying
    @Query("DELETE FROM Match m WHERE m.user1.id = :userId OR m.user2.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(m) FROM Match m WHERE m.user1.id = :userId OR m.user2.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM Match m WHERE m.user1.id = :userId OR m.user2.id = :userId")
    java.util.List<Match> findAllByUserId(@Param("userId") Long userId);
}
