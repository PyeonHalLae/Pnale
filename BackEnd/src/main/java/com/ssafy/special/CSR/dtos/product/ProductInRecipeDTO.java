package com.ssafy.special.CSR.dtos.product;

import com.ssafy.special.enums.EventType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductInRecipeDTO {
    private Long prdId;
    private String prdName;
    private Long price;
    private boolean changeable;
    private Long CUPrice;
    private EventType CUType;
    private Long GSPrice;
    private EventType GSType;
    private Long SEVENPrice;
    private EventType SEVENType;
    private Long EMARTPrice;
    private EventType EMARTType;
}
