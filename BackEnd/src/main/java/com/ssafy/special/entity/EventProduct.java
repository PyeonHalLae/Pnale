package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
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

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime startDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime endDate;

    @ColumnDefault("false")
    boolean isSaled;

    @Enumerated(EnumType.STRING)
    EventType CU;
    @Enumerated(EnumType.STRING)
    EventType GS;
    @Enumerated(EnumType.STRING)
    EventType SEVEN;
    @Enumerated(EnumType.STRING)
    EventType EMART;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;



}
