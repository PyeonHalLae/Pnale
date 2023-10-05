package com.ssafy.special.config;

import com.ssafy.special.enums.RoleType;
import com.ssafy.special.filter.JWTAuthenticationProcessingFilter;
import com.ssafy.special.member.handler.OAuth2LoginFailureHandler;
import com.ssafy.special.member.handler.OAuth2LoginSuccessHandler;
import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.CustomOAuth2UserService;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .formLogin().disable()
                .httpBasic().disable()

                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/api/search/**").permitAll()
                .antMatchers("/api/mylist/**").permitAll()
                .antMatchers("/api/email/**").permitAll()
                .antMatchers("/api/conv/filter/**").permitAll()
                .antMatchers("/api/product/pick/**").authenticated()
                .antMatchers("/api/product/receive/**").authenticated()
                .antMatchers("/api/member/needLogin").permitAll()
                .antMatchers(HttpMethod.POST).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .antMatchers(HttpMethod.DELETE).authenticated()
                .antMatchers(HttpMethod.PATCH).authenticated()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                // 인가
                .antMatchers("/admin/**").hasAuthority(RoleType.ADMIN.name())
                .anyRequest().permitAll()

                // OAuth 로그인
                .and()
                .oauth2Login()
                .loginPage("https://pnale.online/api/member/needLogin")
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
        ;
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public JWTAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        return new JWTAuthenticationProcessingFilter(jwtService, memberRepository);
    }


}
