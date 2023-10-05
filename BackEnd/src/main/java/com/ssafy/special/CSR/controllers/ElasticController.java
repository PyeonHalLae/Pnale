package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.dtos.search.ESRequestDto;
import com.ssafy.special.CSR.services.ElasticService;
import com.ssafy.special.CSR.services.RedisService;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    private final RedisService redisService;

    //키워드가 포함되는 상품 정보를 유사도 순으로 이름,카테고리,ID를 던져준다.
    @PostMapping("")
    public DataResponse<?> getNameList(@PageableDefault(size=120) Pageable pageable,
                                       @RequestBody() Map<String, Object> map,
                                       HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        String name = (String) map.get("name");
        log.info("{}", name);
        return new DataResponse(200, name + "에 대한 검색 리스트를 반환합니다.", goodsService.findSeachList(pageable, name, memberId));
    }

    @PostMapping("/recipe")
    public DataResponse<?> getNameOnRecipeList(@PageableDefault(size = 20) Pageable pageable,
                                       @RequestBody() Map<String, Object> map) {
        String name = (String) map.get("name");
        String category = (String) map.get("category");
        log.info("{} {}", name,category);
        return new DataResponse(200, name + " " + category + "에 대한 검색 리스트를 반환합니다.", goodsService.findSearchRecipeList(pageable, name,category));
    }

    @PostMapping("/recipe/category")
    public DataResponse<?> getNameonRecipeCategoryList(@PageableDefault(size = 10) Pageable pageable,
                                               @RequestBody() Map<String, Object> map) {
        String category = (String) map.get("category");
        log.info("{}",category);
        return new DataResponse(200, category + "에 대한 검색 리스트를 반환합니다.", goodsService.findSearchRecipeCategoryList(pageable,category));
    }
    //검색 결과 반환 - 상품 검색시 가장 먼저 보이는 아이템들 검색상품 12개, 관련상품, 관련레시피
    @PostMapping("/result")
    public DataResponse<?> getNameResult(@PageableDefault(size = 12) Pageable pageable,
                                         @RequestBody ESRequestDto requestData,
                                         HttpServletRequest request) {
        if(requestData.getIds().size() == 0) throw new CustomException(CustomErrorCode.NO_SEARCH_DATA) ;
        Long memberId = (Long) request.getAttribute("memberId");

        try{
            redisService.setSearchList(memberId, requestData.getKeyword());
        }catch(Exception e){
            throw new IllegalArgumentException("Redis문제");
        }finally{
            log.info("{}, 멤버{}", requestData.getIds().size(), memberId);
            return new DataResponse<>(200, "검색 결과를 반환합니다.", goodsService.findIdsResult(pageable, requestData.getIds(), memberId ));
        }



    }


    //검색 결과 더보기
    @PostMapping("/product")
    public DataResponse<?> getResultProduct(@PageableDefault(size = 12) Pageable pageable,
                                            @RequestBody ESRequestDto requestData,
                                            HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, "검색 결과를 반환합니다.", goodsService.findResultProducts(pageable, requestData.getIds(),memberId));
    }

    @GetMapping("/rel_recipe/{productId}")
    public DataResponse<?> getRelateRecipe(@PageableDefault(size = 12) Pageable pageable,
                                           @PathVariable Long productId,
                                           HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse(200, productId + "에 대한 검색 결과를 반환합니다.", goodsService.findRelateRecipe(pageable, productId, memberId));

    }
}