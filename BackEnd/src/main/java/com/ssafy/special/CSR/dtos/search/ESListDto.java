package com.ssafy.special.CSR.dtos.search;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ESListDto {
    private Long id;
    private String name;
    private String category;

    @Builder
    public ESListDto(Long id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}
