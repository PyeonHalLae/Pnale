package com.ssafy.special.product.model.vo;

import com.ssafy.special.enums.EventType;
import com.ssafy.special.memberpickprod.model.vo.UserPickProdResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
public class EventProductDto {

    ProductResponseDto productResponseDto;
    UserPickProdResponseDto userLikeProdResponseDto;

    EventType CUType;
    LocalDate CUDate;

    EventType GSType;
    LocalDate GSDate;

    EventType SEVENType;
    LocalDate SEVENDate;

    EventType EMARTType;
    LocalDate EMARTDate;


    @Builder

    public EventProductDto(ProductResponseDto productResponseDto, UserPickProdResponseDto userLikeProdResponseDto, EventType CUType, LocalDate CUDate, EventType GSType, LocalDate GSDate, EventType SEVENType, LocalDate SEVENDate, EventType EMARTType, LocalDate EMARTDate) {
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
