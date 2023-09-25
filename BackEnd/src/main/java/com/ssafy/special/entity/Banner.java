package com.ssafy.special.entity;

import com.ssafy.special.CSR.dtos.banner.BannerDto;
import com.ssafy.special.enums.CorpType;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long bannerId;

    @Column(nullable = false)
    String bannerName;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime startDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime endDate;

    @Lob
    String thumbnailImg;

    @Lob
    String fullImg;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    public BannerDto toDto(){
        return BannerDto.builder().build();
    }

}
