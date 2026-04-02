package com.teagpt.model;

import jakarta.validation.constraints.NotBlank;

public record CoffeeOrder(
    @NotBlank String coffeeType,
    String size,
    String specialInstructions,
    boolean isUrgent,
    int shakeIntensity
) {}
