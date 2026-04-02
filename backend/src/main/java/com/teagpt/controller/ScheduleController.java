package com.teagpt.controller;

import com.teagpt.model.ScheduleMeetingRequest;
import com.teagpt.model.ScheduleMeetingResponse;
import com.teagpt.service.CalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ScheduleController {

    private final CalendarService calendarService;

    public ScheduleController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @PostMapping("/schedule-meeting")
    public ResponseEntity<ScheduleMeetingResponse> scheduleMeeting(
        @RequestBody ScheduleMeetingRequest request
    ) {
        String meetingLink = calendarService.scheduleCoffeeMeeting(
            request.coffeeType(),
            request.orderNumber(),
            "Earl refuses to negotiate."
        );

        return ResponseEntity.ok(new ScheduleMeetingResponse(
            meetingLink,
            "earl-refusal-" + request.orderNumber(),
            "Earl has reluctantly allowed a meeting. He will attend as a teapot and contribute nothing."
        ));
    }
}
