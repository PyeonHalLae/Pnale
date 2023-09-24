package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.CSR.dtos.product.ProductInfoDto;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

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

    public ProductInfoDto toInfoDto(){
        return ProductInfoDto.builder()
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
