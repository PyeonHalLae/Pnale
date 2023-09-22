package com.ssafy.special.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode {
    /*
        code : 에러 카테고리
        message : 메세지 내용
    */

    PRODUCT_NOT_FOUND(1000, "해당 상품 정보를 찾을 수 없습니다."),

    //USER LIKE PRODUCT 관련
    ULP_NOT_FOUND(2000, "해당 상품에 유저 좋아요 정보를 찾을 수 없습니다."),

    //User 관련
    USER_NOT_FOUND(3000, "해당 유저를 찾을 수 없습니다."),

    //행사 상품 관련
    EP_NOT_FOUND(4000, "해당 상품의 이벤트 정보를 찾을 수 없습니다." ),

    //잘못된 TOKEN 5000
    TOKEN_UNDEFINED_ERROR(5000, "토큰을 해독하는 과정에서 알 수 없는 오류가 발생하였습니다.");

    //레시피 6000

    private final int code;
    private final String message;
}