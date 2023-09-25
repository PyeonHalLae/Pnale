package com.ssafy.special.elastic;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ESResultDto {
    private Long id;
    private String name;
    private String category;

    @Builder
    public ESResultDto(Long id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}
