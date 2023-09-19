package com.ssafy.special.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@Getter
@RequiredArgsConstructor
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public CustomResponse handleException(CustomException e){
        return CustomResponse.builder()
                .code(e.getCustomErrorCode().getCode())
                .message(e.getCustomErrorCode().getMessage())
                .build();
    }

}
