package com.ssafy.special.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@Builder
public class ErrorResponseEntity {
    private Long code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(CustomException e){
        return ResponseEntity.status((int) e.getCustomExceptionType().getCode()).body(
                ErrorResponseEntity.builder()
                        .code(e.getCustomExceptionType().getCode())
                        .message(e.getMessage())
                        .build()
        );
    }
}
