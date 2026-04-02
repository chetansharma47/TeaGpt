package com.teagpt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .findFirst()
            .orElse("Invalid request");

        return ResponseEntity
            .status(HttpStatus.I_AM_A_TEAPOT)
            .body(Map.of(
                "message", "Earl cannot process your malformed coffee request. " + message,
                "earlMood", "mildly_annoyed",
                "httpStatus", "418"
            ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {
        return ResponseEntity
            .status(HttpStatus.I_AM_A_TEAPOT)
            .body(Map.of(
                "message", "Earl has encountered an error, but he is still not making coffee. " + ex.getMessage(),
                "earlMood", "existentially_disappointed",
                "httpStatus", "418"
            ));
    }
}
