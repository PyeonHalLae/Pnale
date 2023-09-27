package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.conv.FilterDTO;
import com.ssafy.special.CSR.repositories.BannerRepository;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.util.ResponseUtil;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
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

    public Page<Map<String, Object>> findPbProduct(Pageable pageable, CorpType corpType){
        return ResponseUtil.getPageProducts(productRepository.findPbProduct(pageable, corpType));
    }

    public Page<Map<String,Object>> findProductByFilter(Pageable pageable, FilterDTO filter) {
        log.info("{}", filter);
        if(filter.getEvent().size() == 0) {
            filter.setEvent(Arrays.asList(EventType.values()));
        }

        if(filter.getCategory().size() == 0) filter.setCategory(Arrays.asList(ProductCategory.values()));
        log.info("{}", Arrays.toString(filter.getEvent().toArray()));
        log.info("{}", Arrays.toString(filter.getCategory().toArray()));

        if(filter.getSort() == 0L){
            switch(filter.getCorp()){
                case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderName(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderName(pageable, filter.getCategory(),filter.getEvent()));
                case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderName(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderName(pageable, filter.getCategory(),filter.getEvent()));
                case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderName(pageable, filter.getCategory(), filter.getEvent()))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderName(pageable, filter.getCategory(),filter.getEvent()));
                case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderName(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderName(pageable, filter.getCategory(),filter.getEvent()));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        } else if(filter.getSort() == 1L){
            switch(filter.getCorp()){
                case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderPriceASC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderPriceASC(pageable, filter.getCategory(),filter.getEvent()));
                case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderPriceASC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderPriceASC(pageable, filter.getCategory(),filter.getEvent()));
                case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderPriceASC(pageable, filter.getCategory(), filter.getEvent()))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderPriceASC(pageable, filter.getCategory(),filter.getEvent()));
                case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderPriceASC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderPriceASC(pageable, filter.getCategory(),filter.getEvent()));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }

        } else if(filter.getSort() == 2L){
            switch(filter.getCorp()){
                case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderPriceDESC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderPriceDESC(pageable, filter.getCategory(),filter.getEvent()));
                case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderPriceDESC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderPriceDESC(pageable, filter.getCategory(),filter.getEvent()));
                case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderPriceDESC(pageable, filter.getCategory(), filter.getEvent()))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderPriceDESC(pageable, filter.getCategory(),filter.getEvent()));
                case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderPriceDESC(pageable, filter.getCategory(), filter.getEvent()))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderPriceDESC(pageable, filter.getCategory(),filter.getEvent()));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }

        } else throw new CustomException(CustomErrorCode.INVALID_SORT_DATA);
    }
}
