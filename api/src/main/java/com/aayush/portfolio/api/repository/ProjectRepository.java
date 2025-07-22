package com.aayush.portfolio.api.repository;

import com.aayush.portfolio.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Spring Data JPA automatically provides CRUD methods. No code needed here.
}