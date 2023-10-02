package com.ssafy.special.CSR.controllers;


import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.CSR.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@RestController
@RequestMapping(value={"/api/product", "/api/auth/product"})
@RequiredArgsConstructor //해당 어노테이션
public class ProductController {
    private final ProductService productService;

    //페이지별 전체 행사상품 반환
    @GetMapping("")
    public DataResponse<?> getAllEventProducts(@PageableDefault(size = 12) Pageable pageable, HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, pageable.getPageNumber() + " 페이지 상품 정보를 반환합니다.",productService.findAllEventProducts(pageable, memberId));
    }

    //추천 상품 정보와 레시피 반환
    @GetMapping("/main")
    public DataResponse<?> getMainPageData(HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, "추첨상품 4개와 레시피 3개를 반환합니다.", productService.findMainPageData(memberId));
    }


    //추천 상품 반환
    @GetMapping("/recommand")
    public DataResponse<?> getRecommandProducts(HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, "추천 상품 4개를 반환합니다.", productService.findRecommandProducts(memberId));
    }

    //상품 좋아요
    @GetMapping("/pick/{productId}")
    public CustomResponse pickProductToggle(@PathVariable("productId") Long productId,
                                            HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        if(memberId == null) throw new CustomException(CustomErrorCode.FORBIDDEN);
        return new CustomResponse(200, productService.pickToggle(productId, memberId));
    }

    //이메일 수신체크
    @GetMapping("/receive/{productId}")
    public CustomResponse receiveEmailToggle(@PathVariable("productId") Long productId,
                                             HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memberId");
        if(memberId == null) throw new CustomException(CustomErrorCode.FORBIDDEN);
        return new CustomResponse(200, productService.receiveToggle(productId, memberId));
    }
}
