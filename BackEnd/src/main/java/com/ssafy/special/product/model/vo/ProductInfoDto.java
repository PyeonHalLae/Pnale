package com.ssafy.special.product.model.vo;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter //JSON 직렬화를 위해서 Dto에 Getter가 필요하다
@NoArgsConstructor
public class ProductInfoDto {
    Long productId;
    String productName;
    String productImg;
    String productDesc;
    Long price;
    ProductCategory category;
    CorpType pb;
    Long recommand;
    Long hit;

    @Builder
    public ProductInfoDto(Long productId, String productName, String productImg, Long price, ProductCategory category, String productDesc, CorpType pb, Long recommand, Long hit) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.price = price;
        this.category = category;
        this.productDesc = productDesc;
        this.pb = pb;
        this.recommand = recommand;
        this.hit = hit;
    }
}
