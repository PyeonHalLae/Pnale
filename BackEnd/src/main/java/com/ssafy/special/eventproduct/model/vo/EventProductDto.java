package com.ssafy.special.eventproduct.model.vo;
import com.ssafy.special.enums.EventPeriod;
import com.ssafy.special.enums.EventType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class EventProductDto {
    EventType CUType;

    EventPeriod CUDate;

    EventType GSType;
    EventPeriod  GSDate;

    EventType SEVENType;
    EventPeriod  SEVENDate;

    EventType EMARTType;

    EventPeriod  EMARTDate;

    @Builder
    public EventProductDto(EventType CUType, EventPeriod CUDate, EventType GSType, EventPeriod GSDate, EventType SEVENType, EventPeriod SEVENDate, EventType EMARTType, EventPeriod EMARTDate) {
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
