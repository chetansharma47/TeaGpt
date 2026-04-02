package com.teagpt.model;

public record ScheduleMeetingResponse(
    String meetingLink,
    String eventId,
    String message
) {}
