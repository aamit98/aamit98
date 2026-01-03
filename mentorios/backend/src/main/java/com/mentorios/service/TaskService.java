package com.mentorios.service;

import com.mentorios.dto.CreateTaskRequest;
import com.mentorios.dto.TaskDTO;
import com.mentorios.dto.UpdateTaskRequest;
import com.mentorios.model.Task;
import com.mentorios.model.User;
import com.mentorios.repository.TaskRepository;
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
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<TaskDTO> getAllTasks() {
        User user = getCurrentUser();
        return taskRepository.findByUserId(user.getId()).stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByStatus(Task.TaskStatus status) {
        User user = getCurrentUser();
        return taskRepository.findByUserIdAndStatus(user.getId(), status).stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTodayTasks() {
        User user = getCurrentUser();
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        return taskRepository.findByUserIdAndDueDateBetween(user.getId(), startOfDay, endOfDay).stream()
                .map(TaskDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Long id) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        return TaskDTO.fromEntity(task);
    }

    @Transactional
    public TaskDTO createTask(CreateTaskRequest request) {
        User user = getCurrentUser();

        Task task = Task.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .priority(request.getPriority() != null ? request.getPriority() : Task.Priority.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : Task.TaskStatus.TODO)
                .dueDate(request.getDueDate())
                .estimateMinutes(request.getEstimateMinutes())
                .tags(request.getTags())
                .relatedCourseId(request.getRelatedCourseId())
                .relatedApplicationId(request.getRelatedApplicationId())
                .build();

        task = taskRepository.save(task);
        log.info("Task created: {} by user: {}", task.getId(), user.getUsername());

        return TaskDTO.fromEntity(task);
    }

    @Transactional
    public TaskDTO updateTask(Long id, UpdateTaskRequest request) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getType() != null) task.setType(request.getType());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getEstimateMinutes() != null) task.setEstimateMinutes(request.getEstimateMinutes());
        if (request.getActualMinutes() != null) task.setActualMinutes(request.getActualMinutes());
        if (request.getTags() != null) task.setTags(request.getTags());
        if (request.getRelatedCourseId() != null) task.setRelatedCourseId(request.getRelatedCourseId());
        if (request.getRelatedApplicationId() != null) task.setRelatedApplicationId(request.getRelatedApplicationId());

        task = taskRepository.save(task);
        log.info("Task updated: {}", task.getId());

        return TaskDTO.fromEntity(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        User user = getCurrentUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to task");
        }

        taskRepository.delete(task);
        log.info("Task deleted: {}", id);
    }
}
