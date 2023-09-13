package com.ssafy.special.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum  CustomExceptionType{
    /*
        code : 에러 카테고리
        message : 메세지 내용
    */
    PRODUCT_NOT_FOUND(1000L, "해당 상품 정보를 찾을 수 없습니다.");


    private final long code;
    private final String message;
}