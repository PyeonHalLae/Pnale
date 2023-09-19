package com.ssafy.special.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.special.enums.RoleType;
import com.ssafy.special.filter.JWTAuthenticationProcessingFilter;
import com.ssafy.special.user.handler.OAuth2LoginFailureHandler;
import com.ssafy.special.user.handler.OAuth2LoginSuccessHandler;
import com.ssafy.special.user.model.JwtService;
import com.ssafy.special.user.model.CustomOAuth2UserService;
import com.ssafy.special.user.model.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

import java.lang.reflect.Executable;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
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
                // 인증
                .antMatchers("/api/main").authenticated()
                // 인가
                .antMatchers("/admin/**").hasAuthority(RoleType.ADMIN.name())
                .anyRequest().permitAll()

                // OAuth 로그인
                .and()
                .oauth2Login()
                .loginPage("/api/loginpage")
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
        ;
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), LogoutFilter.class);
        return http.build();
    }

    @Bean
    public JWTAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        return new JWTAuthenticationProcessingFilter(jwtService, userRepository);
    }

}
