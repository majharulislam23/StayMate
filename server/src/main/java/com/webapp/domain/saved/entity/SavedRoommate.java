package com.webapp.domain.saved.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.webapp.domain.roommate.RoommatePost;
import com.webapp.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "saved_roommates", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "user_id", "roommate_post_id" })
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedRoommate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.EAGER) // Eager fetch to display roommate post details
  @JoinColumn(name = "roommate_post_id", nullable = false)
  private RoommatePost roommatePost;

  @CreationTimestamp
  @Column(name = "saved_at", updatable = false)
  private LocalDateTime savedAt;
}
