package com.example.server.service;

import com.example.server.entity.Test;

import java.util.List;

public interface TestService {
    List<Test> searchTutorial(String term);

    List<Test> getAllTutorial();

    Test getTutorialById(Integer id);

    Test saveTutorial(Test test);

    Test updateTutorial(Integer id, Test test);

    void deleteTutorialById(Integer id);

    void deleteAllTutorial();

    List<Test> findByPublished();
}
