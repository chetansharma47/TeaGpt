package com.teagpt.service;

import com.teagpt.model.CoffeeOrder;
import com.teagpt.model.RefusalResponse;
import org.springframework.stereotype.Service;

@Service
public class RefusalService {

    private final GeminiService geminiService;
    private final RefusalCounterService counter;

    public RefusalService(GeminiService geminiService, RefusalCounterService counter) {
        this.geminiService = geminiService;
        this.counter = counter;
    }

    public RefusalResponse refuse(CoffeeOrder order) {
        long orderNumber = counter.increment();
        int styleIndex = geminiService.getRandomStyleIndex();

        String message = geminiService.generateRefusal(
            order.coffeeType(),
            order.isUrgent(),
            order.shakeIntensity()
        );

        return new RefusalResponse(
            message,
            geminiService.getStyleName(styleIndex),
            counter.getEarlMood(),
            orderNumber,
            counter.getCount(),
            418
        );
    }
}
