package com.mentorios.repository;

import com.mentorios.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndStatus(Long userId, Task.TaskStatus status);
    List<Task> findByUserIdAndDueDateBetween(Long userId, LocalDateTime start, LocalDateTime end);
    List<Task> findByUserIdAndStatusOrderByPriorityDescDueDateAsc(Long userId, Task.TaskStatus status);
}
