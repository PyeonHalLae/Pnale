package com.ssafy.special.user.model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.special.user.model.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessCookie;

    @Value("${jwt.refresh.header}")
    private String refreshCookie;

    private final UserRepository userRepository;

    public String createAccessToken(Long userId){
        Date now = new Date();
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))
                .withClaim("userId", userId)
                .sign(Algorithm.HMAC512(secretKey));
    }


    public String createRefreshToken(){
        Date now = new Date();
        return JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken){
        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge(1800000);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");

        response.addCookie(accessCookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken){
        response.setStatus(HttpServletResponse.SC_OK);

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge(1800000);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");

        Cookie refreshCookie = new Cookie("refreshToken", accessToken);
        refreshCookie.setMaxAge(1209600000);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");

        response.addCookie(refreshCookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public Optional<String> getRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    public Optional<String> getAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("accessToken".equals(cookie.getName())) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    public Optional<Long> getUserId(String accessToken){
        try{
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim("userId")
                    .asLong());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Transactional
    public void updateRefreshToken(Long usrId, String refreshToken) {
        userRepository.findByMemberId(usrId)
                .ifPresentOrElse(
                        user -> user.updateRefreshToken(refreshToken),
                        () -> new Exception("일치하는 회원이 없습니다.")
                );
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
