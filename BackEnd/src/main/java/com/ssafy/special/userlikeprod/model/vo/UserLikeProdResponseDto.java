package com.ssafy.special.userlikeprod.model.vo;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import com.ssafy.special.eventproduct.model.vo.EventProductDto;
import lombok.*;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
public class UserLikeProdResponseDto {
    Long UserLikeProdId;
    boolean emailRecevie;
    boolean likeStat;

    @Builder
    public UserLikeProdResponseDto(Long userLikeProdId, boolean emailRecevie, boolean likeStat) {
        UserLikeProdId = userLikeProdId;
        this.emailRecevie = emailRecevie;
        this.likeStat = likeStat;
    }
}
