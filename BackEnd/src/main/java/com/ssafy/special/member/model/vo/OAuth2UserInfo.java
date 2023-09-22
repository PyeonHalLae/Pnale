package com.ssafy.special.member.model.vo;

import com.ssafy.special.entity.Member;
import com.ssafy.special.enums.RoleType;
import com.ssafy.special.enums.SocialType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public abstract class OAuth2UserInfo {

    // 각 API가 제공하는 유저에 대한 속성
    protected Map<String, Object> attributes;

    // 속성에서 필요한 정보를 가져오는 추상 메서드
    public abstract String getId();
    public abstract String getNickname();
    public abstract String getEmail();
    public abstract String getImage();

    // User 엔티티를 만드는 메서드
    public Member toEntity(String loginId, SocialType socialType){
        return Member.builder()
                .loginId(loginId)
                .nickname(getNickname())
                .memberImg(getImage())
                .role(RoleType.USER)
                .email(getEmail())
                .social(socialType)
                .build();
    }
}
