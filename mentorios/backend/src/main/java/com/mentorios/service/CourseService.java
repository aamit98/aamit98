package com.mentorios.service;

import com.mentorios.dto.CourseDTO;
import com.mentorios.dto.CreateCourseRequest;
import com.mentorios.model.Course;
import com.mentorios.model.User;
import com.mentorios.repository.CourseRepository;
import com.mentorios.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<CourseDTO> getAllCourses() {
        User user = getCurrentUser();
        return courseRepository.findByUserId(user.getId()).stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getActiveCourses() {
        User user = getCurrentUser();
        return courseRepository.findByUserIdAndStatus(user.getId(), Course.CourseStatus.ACTIVE).stream()
                .map(CourseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public CourseDTO getCourseById(Long id) {
        User user = getCurrentUser();
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to course");
        }

        return CourseDTO.fromEntity(course);
    }

    @Transactional
    public CourseDTO createCourse(CreateCourseRequest request) {
        User user = getCurrentUser();

        Course course = Course.builder()
                .user(user)
                .name(request.getName())
                .code(request.getCode())
                .semester(request.getSemester())
                .credits(request.getCredits())
                .status(Course.CourseStatus.ACTIVE)
                .build();

        course = courseRepository.save(course);
        log.info("Course created: {} by user: {}", course.getId(), user.getUsername());

        return CourseDTO.fromEntity(course);
    }

    @Transactional
    public CourseDTO updateCourse(Long id, CreateCourseRequest request) {
        User user = getCurrentUser();
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to course");
        }

        if (request.getName() != null) course.setName(request.getName());
        if (request.getCode() != null) course.setCode(request.getCode());
        if (request.getSemester() != null) course.setSemester(request.getSemester());
        if (request.getCredits() != null) course.setCredits(request.getCredits());

        course = courseRepository.save(course);
        log.info("Course updated: {}", course.getId());

        return CourseDTO.fromEntity(course);
    }

    @Transactional
    public void deleteCourse(Long id) {
        User user = getCurrentUser();
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to course");
        }

        courseRepository.delete(course);
        log.info("Course deleted: {}", id);
    }
}
