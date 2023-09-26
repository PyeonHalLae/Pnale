package com.ssafy.special.entity;

import com.ssafy.special.CSR.dtos.search.ESListDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.data.elasticsearch.annotations.Document;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "product")
@Getter
public class Elastic {
    private Long id;
    private String name;
    private String imgSrc;
    private Integer price;
    private String company;
    private String eventType;
    private String eventDate;
    private String category;

    public ESListDto toDto(){
        return ESListDto.builder()
                .id(this.id)
                .name(this.name)
                .category(this.category)
                .build();
    }


}
