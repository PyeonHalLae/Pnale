package com.ssafy.special.entity;

import com.ssafy.special.enums.EventType;
import com.ssafy.special.product.model.vo.EventProductDto;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
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
    LocalDate CUDate;

    @Enumerated(EnumType.STRING)
    @Column(name="gs_type")
    EventType GSType;
    @Column(name= "gs_date")
    LocalDate  GSDate;

    @Enumerated(EnumType.STRING)
    @Column(name="seven_type")
    EventType SEVENType;
    @Column(name= "seven_date")
    LocalDate  SEVENDate;

    @Enumerated(EnumType.STRING)
    @Column(name="emart_type")
    EventType EMARTType;
    @Column(name= "emart_date")
    LocalDate  EMARTDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;


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
