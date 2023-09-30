package com.ssafy.special.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 에러: " + e.getMessage());
    }

    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public ResponseEntity<String> handlerAsyncRequestTimeoutException(Exception e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Push 알림 서버를 재 연결합니다.");
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<?> authException(AuthException e) {
        if(e.getCustomErrorCode().equals(CustomErrorCode.EXPIRED_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("액세스 토큰이 유효하지 않습니다.");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("재로그인이 필요합니다.");
    }

    @ExceptionHandler(CustomException.class)
    public CustomResponse handlerAsyncRequestTimeoutException(CustomException ce) {
        return new CustomResponse(ce.getCustomErrorCode().getCode(), ce. getCustomErrorCode() .getMessage());
    }
}
