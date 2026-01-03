package com.mentorios.service;

import com.mentorios.dto.CreateExamRequest;
import com.mentorios.dto.ExamDTO;
import com.mentorios.model.Course;
import com.mentorios.model.Exam;
import com.mentorios.model.User;
import com.mentorios.repository.CourseRepository;
import com.mentorios.repository.ExamRepository;
import com.mentorios.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExamService {

    private final ExamRepository examRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<ExamDTO> getAllExams() {
        User user = getCurrentUser();
        return examRepository.findAllByUserId(user.getId()).stream()
                .map(ExamDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ExamDTO> getUpcomingExams() {
        User user = getCurrentUser();
        return examRepository.findUpcomingExamsByUserId(user.getId(), LocalDateTime.now()).stream()
                .map(ExamDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ExamDTO> getExamsByCourse(Long courseId) {
        User user = getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to course");
        }

        return examRepository.findByCourseId(courseId).stream()
                .map(ExamDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExamDTO createExam(CreateExamRequest request) {
        User user = getCurrentUser();

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to course");
        }

        Exam exam = Exam.builder()
                .course(course)
                .name(request.getName())
                .examDate(request.getExamDate())
                .weight(request.getWeight())
                .scope(request.getScope())
                .location(request.getLocation())
                .status(Exam.ExamStatus.UPCOMING)
                .build();

        exam = examRepository.save(exam);
        log.info("Exam created: {} for course: {}", exam.getId(), course.getName());

        return ExamDTO.fromEntity(exam);
    }

    @Transactional
    public void deleteExam(Long id) {
        User user = getCurrentUser();
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (!exam.getCourse().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to exam");
        }

        examRepository.delete(exam);
        log.info("Exam deleted: {}", id);
    }
}
