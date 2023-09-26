package com.ssafy.special.CSR.dtos.product;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Lob;

@Setter
@Getter //JSON 직렬화를 위해서 Dto에 Getter가 필요하다
@NoArgsConstructor
public class ProductInfoDto {
    Long productId;
    String productName;
    String productImg;
    String moreImg;
    Long price;
    Long salePrice;
    ProductCategory category;
    CorpType pb;
    Long recommand;
    Long hit;

    @Builder
    public ProductInfoDto(Long productId, String productName, String productImg, String moreImg, Long price, Long salePrice, ProductCategory category, CorpType pb, Long recommand, Long hit) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.moreImg = moreImg;
        this.price = price;
        this.salePrice = salePrice;
        this.category = category;
        this.pb = pb;
        this.recommand = recommand;
        this.hit = hit;
    }
}
