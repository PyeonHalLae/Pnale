package com.ssafy.special.elastic;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.data.elasticsearch.annotations.Document;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "product")
@Getter
public class Goods {
    private Long id;
    private String name;
    private String imgSrc;
    private Integer price;
    private String company;
    private String eventType;
    private String eventDate;
    private String category;

    public ESResultDto toDto(){
        return ESResultDto.builder()
                .id(this.id)
                .name(this.name)
                .category(this.category)
                .build();
    }


}
