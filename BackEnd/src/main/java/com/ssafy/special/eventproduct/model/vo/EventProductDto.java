package com.ssafy.special.eventproduct.model.vo;

import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.EventPeriod;
import com.ssafy.special.enums.EventType;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

public class EventProductDto {
    EventType CUType;

    EventPeriod CUDate;

    EventType GSType;
    EventPeriod  GSDate;

    EventType SEVENType;
    EventPeriod  SEVENDate;

    EventType EMART;

    EventPeriod  EMARTDate;
}
