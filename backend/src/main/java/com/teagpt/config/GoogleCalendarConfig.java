package com.teagpt.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Configuration
public class GoogleCalendarConfig {

    @Value("${teagpt.calendar.service-account-file}")
    private Resource serviceAccountFile;

    @Value("${teagpt.calendar.user-to-impersonate:}")
    private String userToImpersonate;

    @Bean
    public Calendar googleCalendar() throws IOException, GeneralSecurityException {
        GoogleCredentials credentials;

        if (!serviceAccountFile.exists()) {
            // Return a stub if no service account file — calendar feature gracefully disabled
            return null;
        }

        try (var stream = serviceAccountFile.getInputStream()) {
            credentials = ServiceAccountCredentials
                .fromStream(stream)
                .createScoped(List.of(CalendarScopes.CALENDAR_EVENTS));

            if (!userToImpersonate.isBlank()) {
                credentials = ((ServiceAccountCredentials) credentials)
                    .createDelegated(userToImpersonate);
            }
        }

        return new Calendar.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance(),
            new HttpCredentialsAdapter(credentials)
        ).setApplicationName("TeaGPT-Earl").build();
    }
}
