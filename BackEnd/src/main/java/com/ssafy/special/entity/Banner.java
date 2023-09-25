package com.ssafy.special.entity;

import com.ssafy.special.CSR.dtos.banner.BannerDto;
import com.ssafy.special.enums.CorpType;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
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
    LocalDate startDate;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDate endDate;

    @Enumerated(EnumType.STRING)
    CorpType corpType;

    @Lob
    String thumbnailImg;

    @Lob
    String fullImg;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    public BannerDto toDto(){
        return BannerDto.builder()
                .bannerId(this.bannerId)
                .bannerName(this.bannerName)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .thumbnailImg(this.thumbnailImg)
                .fullImg(this.fullImg)
                .build();
    }

}
