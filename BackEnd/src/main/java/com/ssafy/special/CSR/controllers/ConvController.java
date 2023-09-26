package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ConvService;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value ={"/api/conv", "/api/auth/conv"} )
@RequiredArgsConstructor
@Slf4j
public class ConvController {
    private final ConvService convService;

    @GetMapping("/{corpType}")
    public DataResponse<?> getConvData(@PageableDefault(size = 9) Pageable pageable,
                                       @PathVariable("corpType") CorpType corpType){
        log.info("{}", corpType);
        return new DataResponse<>(200, corpType.name() + "의 데이터를 반환합니다.",
                                    convService.findCorpData(pageable, corpType));
    }

    @GetMapping("/best/{corpType}")
    public DataResponse<?> getBestProduct(@PageableDefault(size = 9) Pageable pageable,
                                       @PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 Best상품들을 반환합니다.", convService.findBestProduct(pageable, corpType));
    }
    @GetMapping("/new/{corpType}")
    public DataResponse<?> getNewProduct(@PageableDefault(size = 9) Pageable pageable,
                                       @PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 신상품을 반환합니다.", convService.findNewProduct(pageable, corpType));
    }

    @GetMapping("/event/{corpType}")
    public DataResponse<?> getEventProduct(@PageableDefault(size = 9) Pageable pageable,
                                         @PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 행사중인 상품을 반환합니다.", convService.findEventProduct(pageable, corpType));
    }
    @GetMapping("/pb/{corpType}")
    public DataResponse<?> getPBProduct(@PageableDefault(size = 9) Pageable pageable,
                                         @PathVariable("corpType") CorpType corpType){
        return new DataResponse<>(200, corpType.name() + "의 PB(독점) 상품을 반환합니다.", convService.findPbProduct(pageable, corpType));
    }

    @PostMapping("/event")
    public DataResponse<?> getDetailData(@PageableDefault(size =9 ) Pageable pageable,
                                         @RequestBody Map<String, Object> data){
        return new DataResponse<>(200, "필터에 따른 결과를 반환합니다.", convService.findEventProductByFilter(pageable, data));
    }





}
