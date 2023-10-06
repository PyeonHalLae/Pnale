package com.ssafy.special.CSR.dtos.conv;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.enums.ProductCategory;
import lombok.*;

import java.util.List;
import java.util.Locale;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FilterDTO {
    Long sort; //0이름순, 1 가겨낮은 순, 2 가격 높은 순
    String dataType; //BEST/ PB
    CorpType corp; //CU || GS || SEVEN || EMART,
    List<EventType> event; //OPO 등 배열
    List<ProductCategory> category;
}
