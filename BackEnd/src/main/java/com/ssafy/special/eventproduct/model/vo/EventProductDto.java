package com.ssafy.special.eventproduct.model.vo;

import com.ssafy.special.enums.EventPeriod;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import com.ssafy.special.userlikeprod.model.vo.UserLikeProdResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class EventProductDto {

    ProductResponseDto productResponseDto;
    UserLikeProdResponseDto userLikeProdResponseDto;

    EventType CUType;
    EventPeriod CUDate;

    EventType GSType;
    EventPeriod GSDate;

    EventType SEVENType;
    EventPeriod SEVENDate;

    EventType EMARTType;
    EventPeriod EMARTDate;


    @Builder
    public EventProductDto(ProductResponseDto productResponseDto, UserLikeProdResponseDto userLikeProdResponseDto, EventType CUType, EventPeriod CUDate, EventType GSType, EventPeriod GSDate, EventType SEVENType, EventPeriod SEVENDate, EventType EMARTType, EventPeriod EMARTDate) {
        this.productResponseDto = productResponseDto;
        this.userLikeProdResponseDto = userLikeProdResponseDto;
        this.CUType = CUType;
        this.CUDate = CUDate;
        this.GSType = GSType;
        this.GSDate = GSDate;
        this.SEVENType = SEVENType;
        this.SEVENDate = SEVENDate;
        this.EMARTType = EMARTType;
        this.EMARTDate = EMARTDate;
    }
}
