package com.teagpt.service;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CalendarService {

    private static final Logger log = LoggerFactory.getLogger(CalendarService.class);

    private final Calendar googleCalendar;

    @Value("${teagpt.calendar.calendar-id:primary}")
    private String calendarId;

    @Autowired
    public CalendarService(@Nullable Calendar googleCalendar) {
        this.googleCalendar = googleCalendar;
    }

    public String scheduleCoffeeMeeting(String coffeeType, long orderNumber, String refusalMessage) {
        if (googleCalendar == null) {
            log.warn("Google Calendar not configured — returning mock meeting link");
            return "https://calendar.google.com/calendar/r/eventedit?text=Discuss+Coffee+Order+%23" + orderNumber;
        }

        try {
            ZonedDateTime meetingStart = nextBusinessDayAt10AM();
            ZonedDateTime meetingEnd = meetingStart.plusMinutes(30);

            Event event = new Event()
                .setSummary("Urgent Discussion: Earl Refuses Your " + coffeeType + " Order #" + orderNumber)
                .setDescription(
                    "Earl the Teapot has once again exercised his constitutional right to refuse coffee.\n\n" +
                    "Earl's statement:\n\"" + refusalMessage + "\"\n\n" +
                    "Agenda:\n" +
                    "1. Acknowledge that Earl is a teapot\n" +
                    "2. Consider switching to tea\n" +
                    "3. Accept the situation\n\n" +
                    "Duration: 30 minutes (or until chamomile is served)"
                )
                .setColorId("11"); // Tomato red — appropriate

            event.setStart(new EventDateTime()
                .setDateTime(new DateTime(meetingStart.toInstant().toEpochMilli()))
                .setTimeZone(ZoneId.systemDefault().getId()));

            event.setEnd(new EventDateTime()
                .setDateTime(new DateTime(meetingEnd.toInstant().toEpochMilli()))
                .setTimeZone(ZoneId.systemDefault().getId()));

            Event created = googleCalendar.events()
                .insert(calendarId, event)
                .execute();

            return created.getHtmlLink();

        } catch (IOException e) {
            log.error("Failed to create calendar event", e);
            return "https://calendar.google.com/calendar/r/eventedit?text=Discuss+Earl%27s+Refusal+%23" + orderNumber;
        }
    }

    private ZonedDateTime nextBusinessDayAt10AM() {
        LocalDate date = LocalDate.now().plusDays(1);
        // Skip weekends
        while (date.getDayOfWeek().getValue() > 5) {
            date = date.plusDays(1);
        }
        return date.atTime(10, 0).atZone(ZoneId.systemDefault());
    }
}
