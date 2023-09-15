package com.ssafy.special.config;

import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.ErrorResponseEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Getter
@RequiredArgsConstructor
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseEntity> customResponse(CustomException e){

    }
}
