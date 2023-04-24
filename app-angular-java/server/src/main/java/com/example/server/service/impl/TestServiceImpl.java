package com.example.server.service.impl;

import com.example.server.entity.Test;
import com.example.server.repository.TestRepository;
import com.example.server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Test> searchTutorial(String term) {
        return testRepository.findByTestContaining(term);
    }

    @Override
    public List<Test> getAllTutorial() {
        return testRepository.findAll();
    }

    @Override
    public Test getTutorialById(Integer id) {
        Optional<Test> optional = testRepository.findById(id);
        Test test;
        if (optional.isPresent()) {
            test = optional.get();
        } else {
            return null;
        }
        return test;
    }

    @Override
    public Test saveTutorial(Test test) {
        return testRepository.save(new Test(test.getTest()));
    }

    @Override
    public Test updateTutorial(Integer id, Test test) {
        Optional<Test> testData = testRepository.findById(id);
        Test _test = testData.get();
        _test.setTest(test.getTest());
        testRepository.save(_test);
        return _test;
    }

    @Override
    public void deleteTutorialById(Integer id) {
        testRepository.deleteById(id);
    }

    @Override
    public void deleteAllTutorial() {
        testRepository.deleteAll();
    }

    @Override
    public List<Test> findByPublished() {
        return testRepository.findByTest(true);
    }
}
