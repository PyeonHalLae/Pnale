package com.ssafy.special.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorCode {
    //글로벌한 것
    EXPIRED_TOKEN(401, "액세스 토큰이 존재하나 유효하지 않습니다."),
    FORBIDDEN(403, "로그인 정보가 없거나 만료되어 재로그인이 필요합니다"),

    //상품관련
    PRODUCT_NOT_FOUND(1000, "해당 상품 정보를 찾을 수 없습니다."),
    CONV_DATA_NOT_FOUND(1001, "해당 편의점 정보를 찾을 수 없습니다."),
    INVALID_SORT_DATA(1002, "해당 정렬 정보를 찾을 수 없습니다."),
    INVALID_REQUEST_DATA(1003, "해당 요청 정보를 찾을 수 없습니다."),

    //USER LIKE PRODUCT 관련
    ULP_NOT_FOUND(2000, "해당 상품에 유저 좋아요 정보를 찾을 수 없습니다."),

    //MEMBER 관련
    USER_NOT_FOUND(3000, "해당 유저를 찾을 수 없습니다."),
    INVALID_MEMBER(3001, "유저 정보가 올바르지 않습니다."),

    //행사 상품 관련
    EP_NOT_FOUND(4000, "해당 상품의 이벤트 정보를 찾을 수 없습니다." ),

    //잘못된 TOKEN 5000
    TOKEN_UNDEFINED_ERROR(5000, "토큰을 해독하는 과정에서 알 수 없는 오류가 발생하였습니다.");

    private final int code;
    private final String message;
}