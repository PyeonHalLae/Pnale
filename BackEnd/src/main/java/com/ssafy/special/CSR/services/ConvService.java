package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.repositories.BannerRepository;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.util.ResponseUtil;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConvService {
    private final BannerService bannerService;
    private final BannerRepository bannerRepository;

    private final ProductRepository productRepository;

    //=======================================================
    public Map<String, Object> findCorpData(Pageable pageable, CorpType corpType) {
        return getData(pageable, corpType);
    }

    private Map<String, Object> getData(Pageable pageable, CorpType corpType){
        Map<String, Object> response = new HashMap<>();
        response.put("banners", bannerService.findCorpBanner(PageRequest.of(0, 5), corpType));
        response.put("bestProduct", findBestProduct(pageable, corpType));
        response.put("newProduct", findNewProduct(pageable, corpType));
        //response.put("eventProduct", findEventProduct(pageable, corpType));
        return response;
    }

    public Page<Map<String, Object>> findBestProduct(Pageable pageable, CorpType corpType){
        switch (corpType) {
            case CU: return ResponseUtil.getPageProducts(productRepository.findCUBestProduct(pageable, CorpType.ALL, corpType));
            case GS: return ResponseUtil.getPageProducts(productRepository.findGSBestProduct(pageable, CorpType.ALL, corpType));
            case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENBestProduct(pageable, CorpType.ALL, corpType));
            case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTBestProduct(pageable, CorpType.ALL, corpType));
            default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
        }
    }

    public Page<Map<String, Object>> findNewProduct(Pageable pageable,CorpType corpType){
        switch (corpType) {
            case CU: return ResponseUtil.getPageProducts(productRepository.findCUNewProduct(pageable, CorpType.ALL, corpType));
            case GS: return ResponseUtil.getPageProducts(productRepository.findGSNewProduct(pageable, CorpType.ALL, corpType));
            case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENNewProduct(pageable, CorpType.ALL, corpType));
            case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTNewProduct(pageable, CorpType.ALL, corpType));
            default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
        }
    }

    //public Page<Map<String, Object>> findEventProduct(Pageable pageable, Map<String, Object> data){
    public Page<Map<String, Object>> findEventProduct(Pageable pageable, CorpType corpType){
        switch (corpType) {
            case CU: return ResponseUtil.getPageProducts(productRepository.findCUEventProduct(pageable, CorpType.ALL, corpType));
            case GS: return ResponseUtil.getPageProducts(productRepository.findGSEventProduct(pageable, CorpType.ALL, corpType));
            case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENEventProduct(pageable, CorpType.ALL, corpType));
            case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTEventProduct(pageable, CorpType.ALL, corpType));
            default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
        }
    }

    public Page<Map<String,Object>> findEventProductByFilter(Pageable pageable, Map<String, Object> data) {
        return null;
    }
}
