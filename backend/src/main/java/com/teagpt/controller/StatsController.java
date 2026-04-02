package com.teagpt.controller;

import com.teagpt.model.StatsResponse;
import com.teagpt.service.RefusalCounterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StatsController {

    private final RefusalCounterService counter;

    public StatsController(RefusalCounterService counter) {
        this.counter = counter;
    }

    @GetMapping("/stats")
    public ResponseEntity<StatsResponse> stats() {
        return ResponseEntity.ok(new StatsResponse(
            counter.getCount(),
            counter.getEarlMood()
        ));
    }
}
