package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
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

    @Lob
    String productImg;

    @Column(columnDefinition = "bigint default 0")
    Long price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ProductCategory category;

    @Lob
    String productDesc;

    @Enumerated(EnumType.STRING)
    CorpType pb;

    @Column(columnDefinition = "bigint default 0")
    Long recommand;

    @Column(columnDefinition = "bigint default 0")
    Long hit;

    @Column(columnDefinition = "DATE", insertable=false, updatable=false)
    LocalDate createdAt;

    @Column(columnDefinition = "DATE", insertable=false)
    LocalDate updatedAt;

    public ProductResponseDto toResponseDto(){
        return ProductResponseDto.builder()
                .productId(this.productId)
                .productName(this.productName)
                .productImg(this.productImg)
                .price(this.price)
                .category(this.category)
                .productDesc(this.productDesc)
                .recommand(this.recommand)
                .pb(this.pb)
                .hit(this.hit)
                .build();
    }

}
