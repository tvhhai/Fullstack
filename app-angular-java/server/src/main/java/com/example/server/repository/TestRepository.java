package com.example.server.repository;

import com.example.server.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findByTest(boolean published);

    List<Test> findByTestContaining(String title);
}
