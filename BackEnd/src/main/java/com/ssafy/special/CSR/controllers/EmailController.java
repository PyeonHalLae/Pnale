package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.dtos.email.EmailDto;
import com.ssafy.special.CSR.services.EmailService;
import lombok.RequiredArgsConstructor;
import com.ssafy.special.exception.CustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/sendtest")
    public CustomResponse SendMail(){
        emailService.sendMail();
        return new CustomResponse(200, "메일 수신 성공");
    }
}
