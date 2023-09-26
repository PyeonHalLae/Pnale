package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ElasticService;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/search")
public class ElasticController {

    private final ElasticService goodsService;

    @PostMapping("")
    public DataResponse<?> getNameList(@PageableDefault(size = 20) Pageable pageable,
                                       @RequestBody() Map<String, Object> map) {
        String name = (String) map.get("name");
        log.info("{}", name);
        return new DataResponse(200, name + "에 대한 검색 리스트를 반환합니다.", goodsService.findSeachList(pageable, name));
    }

    @PostMapping("/result")
    public DataResponse<?> getNameResult(@PageableDefault(size = 9) Pageable pageable,
                                         @RequestBody() Map<String, Object> map) {
        List<Long> ids = (List<Long>) map.get("ids");
        log.info("{}", ids.get(0));
        return null;
        //return new DataResponse<>(200, "검색 결과를 반환합니다.", goodsService.findNameResult(pageable, ));
    }


    @PostMapping("/product")
    public DataResponse<?> getResultProduct(@PageableDefault(size = 12) Pageable pageable,
                                            @RequestBody() Map<String, Object> map){
        List<Long> productIds = (List<Long>) map.get("ids");
        return new DataResponse<>(200, "검색 결과를 반환합니다.", goodsService.findResultProducts(pageable, productIds));
    }

    @PostMapping("/rel_recipe")
    public DataResponse<?> getRelateRecipe(@PageableDefault(size = 12) Pageable pageable,
                                           @RequestBody() Map<String, Object> map){
        String name = (String)map.get("name");
        log.info("{}", name);
        return new DataResponse(200, name + "에 대한 검색 결과를 반환합니다.", goodsService.findRelateRecipe(pageable, name));
    }
}