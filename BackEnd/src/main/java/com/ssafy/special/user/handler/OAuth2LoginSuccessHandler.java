package com.ssafy.special.user.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.special.user.model.JwtService;
import com.ssafy.special.user.model.UserRepository;
import com.ssafy.special.user.model.vo.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private Cookie accessCookie;
    private Cookie refreshCookie;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성


            accessCookie.setMaxAge(1800000);
            accessCookie.setHttpOnly(true);
            accessCookie.setPath("/");
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(1209600000);
            refreshCookie.setHttpOnly(true);

            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            response.sendRedirect("http://localhost:3000/main");

        } catch (Exception e) {
            System.out.println("gd");
            throw e;

        }

    }

    // TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getUsrId());
        String refreshToken = jwtService.createRefreshToken();

        accessCookie = new Cookie("accessToken", accessToken);
        refreshCookie = new Cookie("refreshToken", refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getUsrId(), refreshToken);


    }
}