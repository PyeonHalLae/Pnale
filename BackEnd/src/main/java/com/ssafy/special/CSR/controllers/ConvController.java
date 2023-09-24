package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ConvService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value ={"/api/conv", "/api/auth/conv"} )
@RequiredArgsConstructor
public class ConvController {
    private final ConvService convService;
}
