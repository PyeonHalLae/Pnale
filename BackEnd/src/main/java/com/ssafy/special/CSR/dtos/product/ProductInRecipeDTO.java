package com.ssafy.special.CSR.dtos.product;

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
}
