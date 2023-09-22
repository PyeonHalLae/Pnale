package com.ssafy.special.user;


import com.ssafy.special.entity.Member;
import com.ssafy.special.user.model.JwtService;
import com.ssafy.special.user.model.UserRepository;
import com.ssafy.special.user.model.UserService;
import com.ssafy.special.user.model.vo.UserInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserInfoDTO> getUserInfo(HttpServletRequest request) {
        String token = jwtService.getAccessToken(request).orElseThrow(() -> new RuntimeException("Token not found"));
        Long userId = jwtService.getUserId(token).orElseThrow(() -> new RuntimeException("Token not found"));
        Member user = userRepository.findByMemberId(userId).orElseThrow(() -> new RuntimeException("Token not found"));

        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        UserInfoDTO userInfo = UserInfoDTO.builder().userId(userId).nickname(user.getNickname()).userImg(user.getMemberImg())
                .email(user.getEmail()).socialType(user.getSocial().name()).build();

        return new ResponseEntity<>(userInfo, header,HttpStatus.OK);

    }

    @GetMapping("/loginpage")
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void redirectLogin() {

    }

}