package com.ssafy.special.member.model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
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
    private Integer accessPeriod;

    @Value("${jwt.refresh.expiration}")
    private Integer refreshPeriod;


    private final MemberRepository memberRepository;

    public String createAccessToken(Long memberId){
        Date now = new Date();
        System.out.println(now);
        return JWT.create()
                .withSubject("AccessToken")
                .withExpiresAt(new Date(now.getTime() + accessPeriod))
                .withClaim("memberId", memberId)
                .sign(Algorithm.HMAC512(secretKey));
    }


    public String createRefreshToken(){
        Date now = new Date();
        return JWT.create()
                .withSubject("RefreshToken")
                .withExpiresAt(new Date(now.getTime() + refreshPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken){
        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setMaxAge(1800);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");

        response.addCookie(accessCookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken){
        response.setStatus(HttpServletResponse.SC_OK);

        ResponseCookie accessCookie = ResponseCookie.from("accessToken", accessToken)
                .path("/api")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(1800+3600*9)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .path("/api/auth")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(120960+3600*9)
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());
    }

    @Transactional
    public void sendDeletedToken(Long memberId, HttpServletResponse response){
        response.setStatus(HttpServletResponse.SC_OK);

        ResponseCookie accessCookie = ResponseCookie.from("accessToken", "")
                .path("/api")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", "")
                .path("/api/auth")
                .sameSite("Lax")
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

        updateRefreshToken(memberId, "");
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

    public Optional<Long> getMemberId(String accessToken){
        try{
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim("memberId")
                    .asLong());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Transactional
    public void updateRefreshToken(Long memberId, String refreshToken) {
        memberRepository.findByMemberId(memberId)
                .ifPresent(
                        member -> member.updateRefreshToken(refreshToken)
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
