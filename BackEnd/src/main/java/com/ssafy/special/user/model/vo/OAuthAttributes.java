package com.ssafy.special.user.model.vo;

import com.ssafy.special.entity.User;
import com.ssafy.special.enums.RoleType;
import com.ssafy.special.enums.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class OAuthAttributes {

    private String nameAttributeKey;
    private OAuth2UserInfo oAuth2UserInfo;

    public static OAuthAttributes of(SocialType socialType, String userNameAttributeName, Map<String,Object> attributes){
        System.out.println(socialType.name());
        if(socialType.name().equals("KAKAO")){

            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String,Object> attributes){
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String,Object> attributes){

        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public User toEntity(String loginId, SocialType socialType){
        return User.builder()
                .loginId(loginId)
                .nickname(oAuth2UserInfo.getNickname())
                .usrImg(oAuth2UserInfo.getImage())
                .role(RoleType.USER)
                .email(oAuth2UserInfo.getEmail())
                .social(socialType)
                .build();
    }

}