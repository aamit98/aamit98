package com.mentorios.repository;

import com.mentorios.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCourseId(Long courseId);

    List<Exam> findByExamDateBetweenOrderByExamDateAsc(LocalDateTime start, LocalDateTime end);

    @Query("SELECT e FROM Exam e WHERE e.course.user.id = :userId AND e.examDate >= :now ORDER BY e.examDate ASC")
    List<Exam> findUpcomingExamsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT e FROM Exam e WHERE e.course.user.id = :userId ORDER BY e.examDate DESC")
    List<Exam> findAllByUserId(@Param("userId") Long userId);
}
