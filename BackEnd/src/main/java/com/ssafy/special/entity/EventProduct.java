package com.ssafy.special.entity;

import com.ssafy.special.enums.EventPeriod;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.eventproduct.model.vo.EventProductDto;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EventProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long eventProductId;

    @OneToOne
    @JoinColumn(name ="product_id")
    Product product;

    @Enumerated(EnumType.STRING)
    @Column(name="cu_type")
    EventType CUType;

    @Column(name= "cu_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  CUDate;

    @Enumerated(EnumType.STRING)
    @Column(name="gs_type")
    EventType GSType;
    @Column(name= "gs_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  GSDate;

    @Enumerated(EnumType.STRING)
    @Column(name="seven_type")
    EventType SEVENType;
    @Column(name= "seven_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  SEVENDate;
    @Enumerated(EnumType.STRING)
    @Column(name="emart_type")
    EventType EMARTType;

    @Column(name= "emart_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  EMARTDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;


    public EventProductDto toDto(){
        return EventProductDto.builder()
                .CUType(this.CUType)
                .CUDate(this.CUDate)
                .GSType(this.GSType)
                .GSDate(this.GSDate)
                .SEVENType(this.SEVENType)
                .SEVENDate(this.SEVENDate)
                .EMARTType(this.EMARTType)
                .EMARTDate(this.EMARTDate)
                .build();
    }
}
