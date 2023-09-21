package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="product_id")
    Long productId;

    @Column(nullable = false)
    String productName;

    @Column(nullable = false)
    @Lob
    String productImg;

    @Column(columnDefinition = "default 0")
    Long price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ProductCategory category;

    @Column(nullable = false)
    @Lob
    String productDesc;

    @Enumerated(EnumType.STRING)
    CorpType pb;

    @Column(columnDefinition = "default 0")
    Long like;

    @Column(columnDefinition = "default 0")
    Long hit;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    public ProductResponseDto toResponseDto(){
        return ProductResponseDto.builder()
                .productId(this.productId)
                .productName(this.productName)
                .productImg(this.productImg)
                .price(this.price)
                .category(this.category)
                .productDesc(this.productDesc)
                .like(this.like)
                .pb(this.pb)
                .hit(this.hit)
                .build();
    }

}
