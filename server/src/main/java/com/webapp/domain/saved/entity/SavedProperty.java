package com.webapp.domain.saved.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.webapp.domain.property.entity.Property;
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
@Table(name = "saved_properties", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "user_id", "property_id" })
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedProperty {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "property_id", nullable = false)
  private Property property;

  @CreationTimestamp
  @Column(name = "saved_at", updatable = false)
  private LocalDateTime savedAt;
}
