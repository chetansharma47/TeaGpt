package com.teagpt.model;

public record RefusalResponse(
    String message,
    String style,
    String earlMood,
    long orderNumber,
    long totalRefusals,
    int httpStatus
) {}
