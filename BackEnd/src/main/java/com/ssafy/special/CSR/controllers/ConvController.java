package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ConvService;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value ={"/api/conv", "/api/auth/conv"} )
@RequiredArgsConstructor
public class ConvController {
    private final ConvService convService;

    @GetMapping("/{corpType}")
    public DataResponse<?> getConvData(@PageableDefault(size = 9) Pageable pageable,
                                       @PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 데이터를 반환합니다.",
                                    convService.findCorpData(pageable, corpType));
    }

    @PostMapping("/filter")
    public DataResponse<?> getDetailData(@RequestBody Map<String, Object> data, Pageable pageable){
        return new DataResponse<>(200, "필터에 따른 결과를 반환합니다.");
    }





}
