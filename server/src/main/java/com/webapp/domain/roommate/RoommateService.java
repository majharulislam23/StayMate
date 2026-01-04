package com.webapp.domain.roommate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.webapp.domain.user.entity.User;
import com.webapp.domain.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoommateService {

  private final RoommatePostRepository roommatePostRepository;
  private final UserService userService;

  @Transactional(readOnly = true)
  public RoommatePostDto getPostById(@NonNull Long id) {
    RoommatePost post = roommatePostRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    return mapToDto(post);
  }

  @Transactional
  public RoommatePostDto createPost(@NonNull Long userId, RoommatePostDto request) {
    User user = userService.getUserById(userId);

    RoommatePost post = RoommatePost.builder()
        .user(user)
        .location(request.getLocation())
        .budget(request.getBudget())
        .moveInDate(request.getMoveInDate())
        .bio(request.getBio())
        .genderPreference(request.getGenderPreference())
        .smoking(request.getSmoking())
        .pets(request.getPets())
        .occupation(request.getOccupation())
        .build();

    RoommatePost savedPost = roommatePostRepository.save(post);
    return mapToDto(savedPost);
  }

  public List<RoommatePostDto> searchPosts(String location, Double minBudget, Double maxBudget,
      String genderPreference) {
    return roommatePostRepository.searchPosts(location, minBudget, maxBudget, genderPreference)
        .stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  public List<RoommatePostDto> getMyPosts(@NonNull Long userId) {
    return roommatePostRepository.findByUserId(userId)
        .stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  @Transactional
  public RoommatePostDto updatePost(@NonNull Long userId, @NonNull Long postId, RoommatePostDto request) {
    RoommatePost post = roommatePostRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));

    if (post.getUser() == null || post.getUser().getId() == null || !post.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized to update this post");
    }

    post.setLocation(request.getLocation());
    post.setBudget(request.getBudget());
    post.setMoveInDate(request.getMoveInDate());
    post.setBio(request.getBio());
    post.setGenderPreference(request.getGenderPreference());
    post.setSmoking(request.getSmoking());
    post.setPets(request.getPets());
    post.setOccupation(request.getOccupation());

    return mapToDto(roommatePostRepository.save(post));
  }

  @Transactional
  public void deletePost(@NonNull Long userId, @NonNull Long postId) {
    RoommatePost post = roommatePostRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));

    if (post.getUser() == null || post.getUser().getId() == null || !post.getUser().getId().equals(userId)) {
      throw new RuntimeException("Unauthorized to delete this post");
    }

    roommatePostRepository.delete(post);
  }

  @Transactional
  public RoommatePostDto updateStatus(@NonNull Long id, RoommatePostStatus status) {
    RoommatePost post = roommatePostRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Post not found"));
    post.setStatus(status);
    return mapToDto(roommatePostRepository.save(post));
  }

  @Transactional(readOnly = true)
  public List<RoommatePostDto> getAllPosts() {
    return roommatePostRepository.findAll().stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  private RoommatePostDto mapToDto(RoommatePost post) {
    return RoommatePostDto.builder()
        .id(post.getId())
        .userId(post.getUser() != null ? post.getUser().getId() : null)
        .userName(post.getUser().getFirstName() + " " + post.getUser().getLastName())
        .userAvatar(
            "https://ui-avatars.com/api/?name=" + post.getUser().getFirstName() + "+" + post.getUser().getLastName())
        .location(post.getLocation())
        .budget(post.getBudget())
        .moveInDate(post.getMoveInDate())
        .bio(post.getBio())
        .genderPreference(post.getGenderPreference())
        .smoking(post.getSmoking())
        .pets(post.getPets())
        .occupation(post.getOccupation())
        .status(post.getStatus())
        .createdAt(post.getCreatedAt().toString())
        .build();
  }
}
