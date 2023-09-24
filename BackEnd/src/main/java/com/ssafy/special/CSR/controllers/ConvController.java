package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ConvService;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ={"/api/conv", "/api/auth/conv"} )
@RequiredArgsConstructor
public class ConvController {
    private final ConvService convService;

    @GetMapping("/{corpType}")
    public DataResponse<?> getConvData(@PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 데이터를 반환합니다.");
    }

}
