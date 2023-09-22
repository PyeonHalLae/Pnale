package com.ssafy.special.product.model.vo;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Setter
@Getter //JSON 직렬화를 위해서 Dto에 Getter가 필요하다
@NoArgsConstructor
public class ProductResponseDto {
    Long productId;
    String productName;
    String productImg;
    Long price;
    ProductCategory category;
    String productDesc;
    CorpType pb;
    Long recommand;
    Long hit;

    @Builder
    public ProductResponseDto(Long productId, String productName, String productImg, Long price, ProductCategory category, String productDesc, CorpType pb, Long recommand, Long hit) {
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
