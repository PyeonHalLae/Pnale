package com.ssafy.special.exception;

import lombok.Getter;

@Getter
public class AuthException extends RuntimeException {
    private final CustomErrorCode customErrorCode;
    public AuthException(CustomErrorCode customErrorCode) {
        super(customErrorCode.getMessage());
        this.customErrorCode = customErrorCode;
    }
}