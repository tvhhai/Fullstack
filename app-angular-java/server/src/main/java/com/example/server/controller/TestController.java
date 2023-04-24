package com.example.server.controller;

import com.example.server.entity.Test;
import com.example.server.repository.TestRepository;
import com.example.server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TestController {
    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestService testService;

    @GetMapping("/test")
    public ResponseEntity<List<Test>> getAllTutorials(@RequestParam(required = false) String title) {
        System.out.println("vãi ò");
        try {
            List<Test> test = new ArrayList<>();
            if (title == null) {
                test.addAll(testService.getAllTutorial());
            } else
//                testRepository.findByTitleContaining(title).forEach(test::add);
                test.addAll(testService.searchTutorial(title));
            if (test.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(test, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test/{id}")
    public ResponseEntity<Test> getTutorialById(@PathVariable("id") Integer id) {
        Optional<Test> tutorialData = Optional.ofNullable(testService.getTutorialById(id));
//        if (tutorialData.isPresent()) {
//            return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return tutorialData.isPresent()? new ResponseEntity<>(tutorialData.get(), HttpStatus.OK): new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return tutorialData.map(test -> new ResponseEntity<>(test, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/test")
    public ResponseEntity<Test> createTutorial(@RequestBody Test test) {
        try {
//            Test _test = testRepository
//                    .save(new Test(test.getTitle(), test.getDescription(), false));
            Test _test = testService.saveTutorial(test);
            return new ResponseEntity<>(_test, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/test/{id}")
    public ResponseEntity<Test> updateTutorial(@PathVariable("id") Integer id, @RequestBody Test test) {
        Optional<Test> tutorialData = Optional.ofNullable(testService.updateTutorial(id, test));
//        if (tutorialData.isPresent()) {
//            return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
        return tutorialData.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @DeleteMapping("/test/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer id) {
        try {
            testService.deleteTutorialById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/test")
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        try {
            testService.deleteAllTutorial();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test/published")
    public ResponseEntity<List<Test>> findByPublished() {
        try {
            if (testService.findByPublished().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(testService.findByPublished(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/login")
    public ResponseEntity<List<Test>> login() {
        try {
            if (testService.findByPublished().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(testService.findByPublished(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
