package com.ssafy.special.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public abstract class OAuth2UserInfo {

    // 상속되는 클래스에서만 사용할 수 있도록 protected 사용
    // 각 API가 제공하는 유저에 대한 속성
    protected Map<String, Object> attributes;

    // 속성에서 필요한 정보를 가져오는 추상 메서드
    public abstract String getId();
    public abstract String getNickname();
    public abstract String getEmail();
    public abstract String getImage();
}
