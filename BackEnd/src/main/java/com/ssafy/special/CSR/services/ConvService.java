package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.repositories.BannerRepository;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.ResponseUtil;
import com.ssafy.special.enums.CorpType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConvService {
    private final BannerService bannerService;
    private final BannerRepository bannerRepository;

    private final ProductRepository productRepository;

    //=======================================================
    public Map<String, Object> findCorpData(Pageable pageable, CorpType corpType) {
        Map<String, Object> response = new HashMap<>();

        response.put("banners", bannerService.findCorpBanner(pageable, corpType));
        //베스트 상품 ALL,CU면서 Reco > 0 ->  9개
        response.put("bestProduct", findCorpBestProduct(pageable, corpType));
        //new 상품 ALL, CU isNew = 1 인거 9개
        response.put("newProduct", findCorpNewProduct(pageable, corpType));
        //편의점 행사 상품 상품 ALL, CU -> 페이지
        response.put("eventProduct", findCorpEventProduct(pageable, corpType));
        return response;
    }

    public Page<Map<String, Object>> findCorpBestProduct(Pageable pageable, CorpType corpType){
        return ResponseUtil.getPageProducts(productRepository.findCorpBestProduct(pageable, CorpType.ALL, corpType));
    }

    public Page<Map<String, Object>> findCorpNewProduct(Pageable pageable,CorpType corpType){
        return ResponseUtil.getPageProducts(productRepository.findCorpNewProduct(pageable, CorpType.ALL, corpType));
    }

    public Page<Map<String, Object>> findCorpEventProduct(Pageable pageable,CorpType corpType){
        return ResponseUtil.getPageProducts(productRepository.findCorpEventProduct(pageable, CorpType.ALL, corpType));
    }

}
