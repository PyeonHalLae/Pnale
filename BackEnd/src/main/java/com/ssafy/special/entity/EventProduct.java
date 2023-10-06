package com.ssafy.special.entity;

import com.ssafy.special.enums.EventType;
import com.ssafy.special.CSR.dtos.product.EventInfoDto;
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
    @Column(name ="cu_price")
    Long CUPrice;

    @Enumerated(EnumType.STRING)
    @Column(name="gs_type")
    EventType GSType;
    @Column(name ="gs_price")
    Long GSPrice;

    @Enumerated(EnumType.STRING)
    @Column(name="seven_type")
    EventType SEVENType;
    @Column(name ="seven_price")
    Long SEVENPrice;

    @Enumerated(EnumType.STRING)
    @Column(name="emart_type")
    EventType EMARTType;
    @Column(name ="EMART_price")
    Long EMARTPrice;


    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;


    public EventInfoDto toInfoDto(){
        return EventInfoDto.builder()
                .CUType(this.CUType)
                .CUPrice(this.CUPrice)
                .GSType(this.GSType)
                .GSPrice(this.GSPrice)
                .SEVENType(this.SEVENType)
                .SEVENPrice(this.SEVENPrice)
                .EMARTType(this.EMARTType)
                .EMARTPrice(this.EMARTPrice)
                .build();
    }
}
