package com.webapp.domain.match.service;

import com.webapp.domain.match.dto.MatchRequest;
import com.webapp.domain.match.dto.MatchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MatchService {

    MatchResponse createMatch(Long userId, MatchRequest request);

    Page<MatchResponse> getMyMatches(Long userId, Pageable pageable);

    void unmatch(Long userId, Long matchId);
}
