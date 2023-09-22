package com.ssafy.special.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {
    USER("ROLE_USER", "유저"),
    DELETED("ROLE_DELETED", "탈퇴자"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;
    private final String title;
}
