package com.ssafy.special.CSR.dtos.search;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ESRequestDto {
    private List<Long> ids;
    private String keyword;

}
