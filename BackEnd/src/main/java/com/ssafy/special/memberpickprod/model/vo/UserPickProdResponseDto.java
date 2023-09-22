package com.ssafy.special.memberpickprod.model.vo;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class UserPickProdResponseDto {
    Long UserLikeProdId;
    boolean emailRecevie;
    boolean likeStat;

    @Builder
    public UserPickProdResponseDto(Long userLikeProdId, boolean emailRecevie, boolean likeStat) {
        UserLikeProdId = userLikeProdId;
        this.emailRecevie = emailRecevie;
        this.likeStat = likeStat;
    }
}
