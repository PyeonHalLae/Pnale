package com.ssafy.special.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
public class MoreProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long Id;

    @OneToOne
    @JoinColumn(name = "event_product_id")
    EventProduct eventProduct;

    @Lob
    String moreImg;

    @Column(columnDefinition = "tinyint(1) default 0")
    boolean isValid;

    @Column(columnDefinition = "DATE", insertable=false, updatable=false)
    LocalDate createdAt;

    @Column(columnDefinition = "DATE", insertable=false)
    LocalDate updatedAt;
}
