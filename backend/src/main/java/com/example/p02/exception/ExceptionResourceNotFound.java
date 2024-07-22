package com.example.p02.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ExceptionResourceNotFound extends RuntimeException {
    public ExceptionResourceNotFound(String message) {
        super("ERR_DATA_NOT_FOUND", message, null);        
    }
}
