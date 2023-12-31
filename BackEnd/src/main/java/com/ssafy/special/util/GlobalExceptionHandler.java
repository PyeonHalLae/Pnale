package com.ssafy.special.util;

import com.ssafy.special.exception.AuthException;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomResponse;
import lombok.extern.slf4j.Slf4j;
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

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<?> authException(AuthException e) {
        if(e.getCustomErrorCode().equals(CustomErrorCode.EXPIRED_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("액세스 토큰이 유효하지 않습니다.");
        } else if(e.getCustomErrorCode().equals(CustomErrorCode.EXPIRED_TOKEN)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제되었거나 접근 불가능합니다.");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("재로그인이 필요합니다.");
    }


    @ExceptionHandler(CustomException.class)
    public CustomResponse handlerCustomException(CustomException ce) {
        return new CustomResponse(ce.getCustomErrorCode().getCode(), ce.getCustomErrorCode().getMessage());
    }
}
