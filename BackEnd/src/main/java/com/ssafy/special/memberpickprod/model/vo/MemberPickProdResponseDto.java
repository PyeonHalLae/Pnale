package com.ssafy.special.memberpickprod.model.vo;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class MemberPickProdResponseDto {
    Long UserLikeProdId;
    boolean emailRecevie;
    boolean likeStat;

    @Builder
    public MemberPickProdResponseDto(Long userLikeProdId, boolean emailRecevie, boolean likeStat) {
        UserLikeProdId = userLikeProdId;
        this.emailRecevie = emailRecevie;
        this.likeStat = likeStat;
    }
}
