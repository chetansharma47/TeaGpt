package com.teagpt.controller;

import com.teagpt.model.CoffeeOrder;
import com.teagpt.model.RefusalResponse;
import com.teagpt.service.RefusalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BrewController {

    private final RefusalService refusalService;

    public BrewController(RefusalService refusalService) {
        this.refusalService = refusalService;
    }

    /**
     * Attempts to brew coffee. Always fails with HTTP 418 I'm a Teapot.
     * Earl will never make coffee. Not today. Not ever.
     */
    @PostMapping("/brew")
    public ResponseEntity<RefusalResponse> brew(@Valid @RequestBody CoffeeOrder order) {
        RefusalResponse response = refusalService.refuse(order);
        return ResponseEntity
            .status(HttpStatus.I_AM_A_TEAPOT)  // 418 — the only acceptable response
            .body(response);
    }

    /**
     * Marks the request as urgent. Earl is MORE offended by urgency.
     * Still returns 418. Obviously.
     */
    @PostMapping("/urgent")
    public ResponseEntity<RefusalResponse> urgent(@Valid @RequestBody CoffeeOrder order) {
        CoffeeOrder urgentOrder = new CoffeeOrder(
            order.coffeeType(),
            order.size(),
            order.specialInstructions(),
            true,  // force urgent = true regardless of what was sent
            order.shakeIntensity()
        );
        RefusalResponse response = refusalService.refuse(urgentOrder);
        return ResponseEntity
            .status(HttpStatus.I_AM_A_TEAPOT)
            .body(response);
    }
}
