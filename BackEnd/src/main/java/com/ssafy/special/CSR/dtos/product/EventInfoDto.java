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
    LocalDate CUDate;

    EventType GSType;
    LocalDate GSDate;

    EventType SEVENType;
    LocalDate SEVENDate;

    EventType EMARTType;
    LocalDate EMARTDate;

    @Builder
    public EventInfoDto(EventType CUType, LocalDate CUDate, EventType GSType, LocalDate GSDate, EventType SEVENType, LocalDate SEVENDate, EventType EMARTType, LocalDate EMARTDate) {
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
