package com.ssafy.special.CSR.dtos.search;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RedisSearchDTO {
    private Long memberId;
    private String keyword;
    private Long time;

    @Builder
    public RedisSearchDTO(Long memberId, String keyword, Long time){
        this.memberId = memberId;
        this.keyword = keyword;
        this.time = time;
    }
}
