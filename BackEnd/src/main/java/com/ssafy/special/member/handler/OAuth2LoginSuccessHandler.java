package com.ssafy.special.member.handler;

import com.ssafy.special.CSR.services.RedisService;
import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.vo.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${myconfig.URL}")
    private String url;
    private final JwtService jwtService;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final RedisService redisService;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

        OAuth2AccessToken oauth2Token = authorizedClient.getAccessToken();

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            redisService.setOauth2token(oAuth2User.getUserId(), oauth2Token.getTokenValue());

            String accessToken = jwtService.createAccessToken(oAuth2User.getUserId());
            String refreshToken = jwtService.createRefreshToken();

            jwtService.updateRefreshToken(oAuth2User.getUserId(), refreshToken);
            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);


            response.sendRedirect(url+"/temp");

        } catch (Exception e) {
            System.out.println("에러 로그");
            throw e;

        }

    }

}