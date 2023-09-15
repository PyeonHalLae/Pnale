package com.ssafy.special.entity;

import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import lombok.Builder;
import lombok.Getter;
import net.bytebuddy.implementation.bind.annotation.BindingPriority;
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

    @ColumnDefault("0")
    Long price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ProductCategory category;

    @Column(nullable = false)
    @Lob
    String productDesc;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    public ProductResponseDto toResponseDto(){
        return ProductResponseDto.builder()
                .producetName(this.productName)
                .productImg(this.productImg)
                .price(this.price)
                .category(this.category)
                .productDesc(this.productDesc)
                .build();
    }

}
