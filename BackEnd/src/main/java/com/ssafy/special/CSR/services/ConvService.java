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
    private final ProductRepository productRepository;

    //=======================================================
    public Map<String, Object> findCorpData(Pageable pageable, CorpType corpType, Long memberId) {
        Map<String, Object> response = new HashMap<>();
        response.put("banners", bannerService.findCorpBanner(pageable, corpType));
        response.put("bestProduct", findBestProduct(pageable, corpType, memberId));
        response.put("newProduct", findNewProduct(pageable, corpType, memberId));
        return response;
    }


    public Page<Map<String, Object>> findBestProduct(Pageable pageable, CorpType corpType, Long memberId){
        if(memberId == null){
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUBestProduct(pageable, CorpType.ALL, corpType));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSBestProduct(pageable, CorpType.ALL, corpType));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENBestProduct(pageable, CorpType.ALL, corpType));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTBestProduct(pageable, CorpType.ALL, corpType));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }else {
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUBestProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSBestProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENBestProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTBestProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }
    }

    public Page<Map<String, Object>> findNewProduct(Pageable pageable,CorpType corpType, Long memberId){
        if(memberId == null){
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUNewProduct(pageable, CorpType.ALL, corpType));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSNewProduct(pageable, CorpType.ALL, corpType));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENNewProduct(pageable, CorpType.ALL, corpType));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTNewProduct(pageable, CorpType.ALL, corpType));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }else{
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUNewProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSNewProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENNewProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTNewProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }
    }

    public Page<Map<String, Object>> findEventProduct(Pageable pageable, CorpType corpType, Long memberId){
        if(memberId == null){
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUEventProduct(pageable, CorpType.ALL, corpType));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSEventProduct(pageable, CorpType.ALL, corpType));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENEventProduct(pageable, CorpType.ALL, corpType));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTEventProduct(pageable, CorpType.ALL, corpType));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }else{
            switch (corpType) {
                case CU: return ResponseUtil.getPageProducts(productRepository.findCUEventProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case GS: return ResponseUtil.getPageProducts(productRepository.findGSEventProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case SEVEN: return ResponseUtil.getPageProducts(productRepository.findSEVENEventProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                case EMART: return ResponseUtil.getPageProducts(productRepository.findEMARTEventProductByMemberId(pageable, CorpType.ALL, corpType, memberId));
                default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
            }
        }
    }

    public Page<Map<String, Object>> findPbProduct(Pageable pageable, CorpType corpType, Long memberId){
        return memberId != null
                ? ResponseUtil.getPageProducts(productRepository.findPbProductByMemberId(pageable, corpType, memberId))
                : ResponseUtil.getPageProducts(productRepository.findPbProduct(pageable, corpType));

    }

    public Page<Map<String,Object>> findProductByFilter(Pageable pageable, FilterDTO filter, Long memberId) {
        //행사정보를 선택하지 않은 경우 모든 행사를 추가한다.
        if(filter.getEvent().size() == 0) filter.setEvent(Arrays.asList(EventType.values()));

        if(filter.getCategory().size() == 0) filter.setCategory(Arrays.asList(ProductCategory.values()));
        log.info("{}", Arrays.toString(filter.getEvent().toArray()));
        log.info("{}", Arrays.toString(filter.getCategory().toArray()));

        if(memberId == null){
            if(filter.getSort() == 0L){//이름순
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
            } else if(filter.getSort() == 1L){//가격 오름차순
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

            } else if(filter.getSort() == 2L){ //가격 내림차순
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
        }else{
            if(filter.getSort() == 0L){//이름순
                switch(filter.getCorp()){
                    case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderNameByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderNameByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderNameByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderNameByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderNameByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderNameByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderNameByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderNameByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
                }
            } else if(filter.getSort() == 1L){//가격 오름차순
                switch(filter.getCorp()){
                    case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderPriceASCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderPriceASCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderPriceASCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderPriceASCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderPriceASCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderPriceASCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderPriceASCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderPriceASCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
                }

            } else if(filter.getSort() == 2L){ //가격 내림차순
                switch(filter.getCorp()){
                    case CU : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.cuEventFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.cuPBFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case GS : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.gsEventFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.gsPBFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case SEVEN: return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.sevenEventFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            :  ResponseUtil.getPageProducts(productRepository.sevenPBFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    case EMART : return filter.getDataType().equals("EVENT")
                            ? ResponseUtil.getPageProducts(productRepository.emartEventFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(), filter.getEvent(), memberId))
                            : ResponseUtil.getPageProducts(productRepository.emartPBFilterOrderPriceDESCByMemberId(pageable, filter.getCategory(),filter.getEvent(), memberId));
                    default: throw new CustomException(CustomErrorCode.CONV_DATA_NOT_FOUND);
                }

            } else throw new CustomException(CustomErrorCode.INVALID_SORT_DATA);
        }

    }
}
