package com.ssafy.special.exception;

import com.ssafy.special.entity.UserLikeProd;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum  CustomExceptionType{
    /*
        code : 에러 카테고리
        message : 메세지 내용
    */

    PRODUCT_NOT_FOUND(1000L, "해당 상품 정보를 찾을 수 없습니다."),

    //USER LIKE PRODUCT 관련
    ULP_NOT_FOUND(2000L, "해당 상품에 유저 좋아요 정보를 찾을 수 없습니다."),

    //User 관련
    USER_NOT_FOUND(3000L, "해당 유저를 찾을 수 없습니다.");

    private final long code;
    private final String message;
}