package com.ssafy.special.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    CustomExceptionType customExceptionType;
}
