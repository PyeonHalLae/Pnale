package com.ssafy.special.CSR.dtos.memberpick;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class MemberPickProdInfoDto {
    Long pickProdId;
    boolean isReceived;
    boolean likeStat;

    @Builder
    public MemberPickProdInfoDto(Long pickProdId, boolean isReceived, boolean likeStat) {
        this.pickProdId = pickProdId;
        this.isReceived = isReceived;
        this.likeStat = likeStat;
    }
}
