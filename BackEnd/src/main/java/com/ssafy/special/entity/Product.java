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
    Long productId;

    @Column(nullable = false)
    String productName;

    @Lob
    String productImg;

    @Lob
    String moreImg;

    @Column(columnDefinition = "bigint default 0")
    Long price;

    @Column(columnDefinition = "bigint default 0")
    Long salePrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ProductCategory category;

    @Enumerated(EnumType.STRING)
    CorpType pb;

    @Column(columnDefinition = "tinyInt(1) default 0")
    boolean isNew;

    @Column(columnDefinition = "bigint default 0")
    Long recommand;

    @Column(columnDefinition = "bigint default 0")
    Long hit;

    @Column(columnDefinition = "DATE", insertable=false, updatable=false)
    LocalDate createdAt;

    @Column(columnDefinition = "DATE", insertable=false)
    LocalDate updatedAt;

    @OneToOne(mappedBy = "product")
    private EventProduct eventProduct;

    public ProductInfoDto toInfoDto(){
        return ProductInfoDto.builder()
                .productId(this.productId)
                .productName(this.productName)
                .productImg(this.productImg)
                .moreImg(this.moreImg)
                .price(this.price)
                .salePrice(this.salePrice)
                .category(this.category)
                .recommand(this.recommand)
                .pb(this.pb)
                .hit(this.hit)
                .build();
    }

}
