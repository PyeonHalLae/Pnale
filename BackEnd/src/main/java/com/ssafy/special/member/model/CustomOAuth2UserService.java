package com.ssafy.special.member.model;


import com.ssafy.special.entity.Member;
import com.ssafy.special.enums.RoleType;
import com.ssafy.special.enums.SocialType;
import com.ssafy.special.member.model.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Transactional
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
                .getUserNameAttributeName();


        OAuth2UserInfo oAuth2UserInfo;
        if(socialType.name().equals("KAKAO")){
            oAuth2UserInfo = new KakaoOAuth2UserInfo(oAuth2User.getAttributes());
        } else {
            oAuth2UserInfo = new GoogleOAuth2UserInfo(oAuth2User.getAttributes());
        }


        Member member = saveOrFind(oAuth2UserInfo, socialType);


        return new CustomOAuth2User(Collections.singleton(new SimpleGrantedAuthority(member.getRole().getKey())),
                oAuth2User.getAttributes(), userNameAttributeName, member.getMemberId());
    }

    private SocialType getSocialType(String registrationId){
        if("KAKAO".equals(registrationId)){
            return SocialType.KAKAO;
        }
        return SocialType.GOOGLE;
    }

    private Member saveOrFind(OAuth2UserInfo userInfo, SocialType socialType){
        String loginId = socialType.name() + "_" + userInfo.getId();

        Member member = memberRepository.findByLoginIdAndRole(loginId, RoleType.USER).orElse(null);

        if(member == null){
            return memberRepository.save(userInfo.toEntity(loginId, socialType));
        }
        return member;
    }
}