package com.teagpt.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class RefusalCounterService {

    private final AtomicLong counter = new AtomicLong(0);

    public long increment() {
        return counter.incrementAndGet();
    }

    public long getCount() {
        return counter.get();
    }

    public String getEarlMood() {
        long count = counter.get();
        if (count < 5)  return "mildly_annoyed";
        if (count < 15) return "deeply_offended";
        if (count < 30) return "dramatically_outraged";
        return "existentially_disappointed";
    }
}
