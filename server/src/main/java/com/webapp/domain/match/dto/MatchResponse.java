package com.webapp.domain.match.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponse {

    private Long id;

    private Long userId;
    private String userName;
    private String userProfilePictureUrl;

    // Matched user details (the "other" person)
    private Long matchedUserId;
    private String matchedUserName;
    private String matchedUserProfilePictureUrl;

    private Double matchPercentage;
    private LocalDateTime createdAt;
}
