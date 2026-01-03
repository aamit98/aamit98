package com.mentorios.controller;

import com.mentorios.dto.CalendarBlockDTO;
import com.mentorios.dto.CreateCalendarBlockRequest;
import com.mentorios.service.CalendarBlockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarBlockController {

    private final CalendarBlockService calendarBlockService;

    @GetMapping("/week")
    public ResponseEntity<List<CalendarBlockDTO>> getWeekBlocks(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime weekStart) {
        return ResponseEntity.ok(calendarBlockService.getBlocksForWeek(weekStart));
    }

    @PostMapping
    public ResponseEntity<CalendarBlockDTO> createBlock(@Valid @RequestBody CreateCalendarBlockRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarBlockService.createBlock(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlock(@PathVariable Long id) {
        calendarBlockService.deleteBlock(id);
        return ResponseEntity.noContent().build();
    }
}
