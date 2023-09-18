package com.ssafy.special.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException {
    private CustomErrorCode customErrorCode;
    private String customErrorMessage;

    public CustomException(CustomErrorCode customErrorCode){
        super(customErrorCode.getMessage()); //runtimeException
        this.customErrorCode = customErrorCode;
        this.customErrorMessage = customErrorCode.getMessage();
    }
}
