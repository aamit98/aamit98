package com.mentorios.service;

import com.mentorios.dto.CalendarBlockDTO;
import com.mentorios.dto.CreateCalendarBlockRequest;
import com.mentorios.model.CalendarBlock;
import com.mentorios.model.Task;
import com.mentorios.model.User;
import com.mentorios.repository.CalendarBlockRepository;
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
public class CalendarBlockService {

    private final CalendarBlockRepository calendarBlockRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<CalendarBlockDTO> getBlocksForWeek(LocalDateTime weekStart) {
        User user = getCurrentUser();
        LocalDateTime weekEnd = weekStart.plusWeeks(1);
        return calendarBlockRepository.findByUserIdAndStartTimeBetweenOrderByStartTimeAsc(
                user.getId(), weekStart, weekEnd).stream()
                .map(CalendarBlockDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public CalendarBlockDTO createBlock(CreateCalendarBlockRequest request) {
        User user = getCurrentUser();

        CalendarBlock block = CalendarBlock.builder()
                .user(user)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .label(request.getLabel())
                .category(request.getCategory())
                .build();

        if (request.getTaskId() != null) {
            Task task = taskRepository.findById(request.getTaskId())
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            if (!task.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Unauthorized access to task");
            }
            block.setTask(task);
        }

        block = calendarBlockRepository.save(block);
        log.info("Calendar block created: {} by user: {}", block.getId(), user.getUsername());

        return CalendarBlockDTO.fromEntity(block);
    }

    @Transactional
    public void deleteBlock(Long id) {
        User user = getCurrentUser();
        CalendarBlock block = calendarBlockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendar block not found"));

        if (!block.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to calendar block");
        }

        calendarBlockRepository.delete(block);
        log.info("Calendar block deleted: {}", id);
    }
}
