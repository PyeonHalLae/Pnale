package com.ssafy.special.member.handler;

import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.vo.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
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


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            String accessToken = jwtService.createAccessToken(oAuth2User.getUserId());
            String refreshToken = jwtService.createRefreshToken();

            System.out.println(refreshToken);
            jwtService.updateRefreshToken(oAuth2User.getUserId(), refreshToken);
            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);


            response.sendRedirect(url+"/temp");

        } catch (Exception e) {
            System.out.println("gd");
            throw e;

        }

    }

}