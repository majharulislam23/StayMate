package com.webapp.domain.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.domain.admin.entity.CMSContent;

@Repository
public interface CMSContentRepository extends JpaRepository<CMSContent, Long> {

  Optional<CMSContent> findByKey(String key);
}
