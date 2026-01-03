package com.mentorios.repository;

import com.mentorios.model.CalendarBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarBlockRepository extends JpaRepository<CalendarBlock, Long> {
    List<CalendarBlock> findByUserIdAndStartTimeBetweenOrderByStartTimeAsc(
            Long userId, LocalDateTime start, LocalDateTime end);
}
