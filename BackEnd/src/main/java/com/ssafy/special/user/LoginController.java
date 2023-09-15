package com.ssafy.special.user;


import com.ssafy.special.entity.User;
import com.ssafy.special.user.model.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {

    private final UserService userService;

    @GetMapping("/main")
    @ResponseStatus(HttpStatus.OK)
    public void test(Model model) {


    }

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public void loginPage(HttpServletResponse response) throws IOException {
        System.out.println(response.getHeader("Access-Control-Allow-Origin"));

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.sendRedirect("http://localhost:3000");
    }

}