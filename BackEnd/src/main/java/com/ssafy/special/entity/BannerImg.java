package com.ssafy.special.entity;

import javax.persistence.*;

@Entity
public class BannerImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long eventImgId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    Banner event;

    @Lob
    String eventImg;
}