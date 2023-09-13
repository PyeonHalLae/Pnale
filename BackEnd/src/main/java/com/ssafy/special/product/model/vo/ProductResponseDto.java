package com.ssafy.special.product.model.vo;

import lombok.Builder;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Lob;
import java.time.LocalDateTime;

@Setter
public class ProductResponseDto {
    Long productId;
    String producetName;
    String productImg;
    Long price;
    String productDesc;

    @Builder
    public ProductResponseDto(Long productId, String producetName, String productImg, Long price, String productDesc) {
        this.productId = productId;
        this.producetName = producetName;
        this.productImg = productImg;
        this.price = price;
        this.productDesc = productDesc;
    }
}
