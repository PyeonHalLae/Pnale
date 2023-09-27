package com.ssafy.special.CSR.dtos.product;

import com.ssafy.special.enums.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class EventInfoDto {
    EventType CUType;
    Long CUPrice;

    EventType GSType;
    Long GSPrice;

    EventType SEVENType;
    Long SEVENPrice;

    EventType EMARTType;
    Long EMARTPrice;


    @Builder

    public EventInfoDto(EventType CUType, Long CUPrice, EventType GSType, Long GSPrice, EventType SEVENType, Long SEVENPrice, EventType EMARTType, Long EMARTPrice) {
        this.CUType = CUType;
        this.CUPrice = CUPrice;
        this.GSType = GSType;
        this.GSPrice = GSPrice;
        this.SEVENType = SEVENType;
        this.SEVENPrice = SEVENPrice;
        this.EMARTType = EMARTType;
        this.EMARTPrice = EMARTPrice;
    }
}
