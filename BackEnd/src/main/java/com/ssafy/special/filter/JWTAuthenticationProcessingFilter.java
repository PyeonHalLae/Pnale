package com.ssafy.special.filter;

import com.ssafy.special.entity.Member;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.auth.message.AuthException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JWTAuthenticationProcessingFilter extends OncePerRequestFilter {
    // https://pnale.online/oaut2
    private static final String NO_CHECK_URL = "oauth";

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 액세스 토큰이 있는지 확인합니다.
        String accessToken = jwtService.getAccessToken(request)
                .orElse(null);


        System.out.println(request.getRequestURI());
        // 액세스 토큰이 없거나, 전혀 관계없는 요청들(favicon 요청 및 oauth2관련 요청)은 다음 필터로 진행합니다.
        // 따라서 로그인이 반드시 필요한 API는 이후 SpringSecurity의 Authentication 필터에서 걸려 403오류를 보냅니다.
        if(accessToken == null || request.getRequestURI().contains(NO_CHECK_URL) || request.getRequestURI().contains("favicon")){
            request.setAttribute("memberId", null);
            filterChain.doFilter(request, response);
            return;
        }

        // 리프레시 토큰을 확인합니다.
        // 리프레시 토큰은 액세스 토큰이 존재하지만 만료되었을 경우에만 쿠키에 포함됩니다.
        String ref = jwtService.getRefreshToken(request).orElse(null);
        String refreshToken = jwtService.getRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);


        // 리프레시 토큰이 유효할 경우, AccessToken을 새롭게 추가하면서 메서드를 진행합니다.
        if (refreshToken!=null) {
            checkRefreshTokenAndReIssueAccessToken(request, response, refreshToken);
            filterChain.doFilter(request, response);
        }

        else {
            // 액세스 토큰이 유효하다면, 엑세스토큰에서 userId를 추출하고 user를 찾아 인증 객체에 넣습니다.
            // 이후에 이용하기 위해 Attribute에 userId를 넣습니다.
            if(jwtService.isTokenValid(accessToken)){

                jwtService.getMemberId(accessToken).flatMap(memberRepository::findByMemberId).ifPresent(member -> {
                    saveAuthentication(member);
                    request.setAttribute("memberId", member.getMemberId());
                });

                filterChain.doFilter(request, response);


            }

            else if(ref == null){
                // 액세스 토큰이 유효하지 않으면 refreshTOken을 다시 받기 위한 error를 호출합니다.
                response.sendError(401, "액세스 토큰이 유효하지 않습니다.");
            }

            else response.sendError(403, "재로그인이 필요합니다.");

        }
    }

    // Refresh token으로 user를 찾고 매칭에 성공하면 userId를 헤더에 넣고 인증합니다.

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletRequest request,
                                                       HttpServletResponse response, String refreshToken) {
        memberRepository.findByRefreshToken(refreshToken)
                .ifPresent(member -> {
                    String reIssuedRefreshToken = reIssueRefreshToken(member);
                    String reIssuedAccessToken = jwtService.createAccessToken(member.getMemberId());

                    jwtService.sendAccessAndRefreshToken(response, reIssuedAccessToken, reIssuedRefreshToken);
                    request.setAttribute("memberId", member.getMemberId());
                    System.out.println(request.getAttribute("memberId"));
                    saveAuthentication(member);
                });
    }

    // reIssue합니다.
    @Transactional
    private String reIssueRefreshToken(Member member) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        member.updateRefreshToken(reIssuedRefreshToken);
        memberRepository.save(member);
        return reIssuedRefreshToken;
    }


    // 인증을 수행합니다.
    public void saveAuthentication(Member member) {
        UserDetails userDetailsMember = org.springframework.security.core.userdetails.User.builder()
                .username(member.getLoginId())
                .password("")
                .roles(member.getRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsMember, null,
                        authoritiesMapper.mapAuthorities(userDetailsMember.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
