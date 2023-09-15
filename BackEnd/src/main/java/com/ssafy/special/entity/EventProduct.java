package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.EventPeriod;
import com.ssafy.special.enums.EventType;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

public class EventProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long eventProductId;

    @OneToMany
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
    @Column(name= "cu_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  GSDate;

    @Enumerated(EnumType.STRING)
    @Column(name="seven_type")
    EventType SEVENType;
    @Column(name= "cu_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  SEVENDate;
    @Enumerated(EnumType.STRING)
    @Column(name="emart_type")
    EventType EMART;

    @Column(name= "cu_date")
    @Enumerated(EnumType.STRING)
    EventPeriod  EMARTDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;
}
