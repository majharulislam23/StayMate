package com.webapp.domain.roommate;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoommatePostDto {
  private Long id;
  private Long userId;
  private String userName;
  private String userAvatar;

  private String location;
  private Double budget;
  private LocalDate moveInDate;
  private String bio;

  private String genderPreference;
  private Boolean smoking;
  private Boolean pets;
  private String occupation;

  private String createdAt;
  private RoommatePostStatus status;
}
