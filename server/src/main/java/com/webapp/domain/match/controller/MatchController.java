package com.webapp.domain.match.controller;

import com.webapp.auth.security.UserPrincipal;
import com.webapp.domain.match.dto.MatchRequest;
import com.webapp.domain.match.dto.MatchResponse;
import com.webapp.domain.match.service.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping
    public ResponseEntity<MatchResponse> createMatch(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody MatchRequest request) {
        return ResponseEntity.ok(matchService.createMatch(userPrincipal.getId(), request));
    }

    @GetMapping
    public ResponseEntity<Page<MatchResponse>> getMyMatches(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(matchService.getMyMatches(userPrincipal.getId(), pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> unmatch(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id) {
        matchService.unmatch(userPrincipal.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
