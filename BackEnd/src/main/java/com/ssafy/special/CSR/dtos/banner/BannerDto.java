package com.ssafy.special.CSR.dtos.banner;

import com.ssafy.special.enums.CorpType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BannerDto {
    Long bannerId;
    String bannerName;
    LocalDate startDate;
    LocalDate endDate;
    CorpType corpType;
    String thumbnailImg;
    String fullImg;

    @Builder

    public BannerDto(Long bannerId, String bannerName, LocalDate startDate, LocalDate endDate, CorpType corpType, String thumbnailImg, String fullImg) {
        this.bannerId = bannerId;
        this.bannerName = bannerName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.corpType = corpType;
        this.thumbnailImg = thumbnailImg;
        this.fullImg = fullImg;
    }
}

