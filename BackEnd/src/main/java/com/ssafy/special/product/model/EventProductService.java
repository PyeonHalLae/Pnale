package com.ssafy.special.product.model;

import com.ssafy.special.entity.EventProduct;

import com.ssafy.special.product.model.vo.EventProductDto;
import com.ssafy.special.product.model.vo.ProductInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventProductService {
    /*
    private final EventProductRepository eventProductRepository;

    public Page<EventProductDto> findAllEventProducts(Pageable pageable) {
        return getEvnetProductPages(eventProductRepository.findAll(pageable));
    }

    //==================================
    // 내부 메소드 선언
    private Page<EventProductDto> getEvnetProductPages(Page<EventProduct> data) {
        return data.map(eventProduct -> {
            EventProductDto eventProductDto = modelMapper.map(eventProduct, EventProductDto.class);
            eventProductDto.setProductInfo(modelMapper.map(eventProduct.getProduct(), ProductInfoDto.class));
            //유저가 로그인 했을 때 좋아요 정보를 함께 반환해주는 로직추가
            //eventProductDto.setUserLikeProdResponseDto(~~);

            return eventProductDto;
        });
    }
*/
}
