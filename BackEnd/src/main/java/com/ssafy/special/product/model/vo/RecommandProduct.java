package com.ssafy.special.product.model.vo;

import com.ssafy.special.entity.Member;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.memberpickprod.model.vo.MemberPickProdResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecommandProduct {
    Long productId;
    String productName;
    String productImg;
    Long price;
    ProductCategory category;
    String productDesc;
    CorpType pb;
    Long recommand;
    Long hit;

    EventInfoDto eventInfoDto;
    MemberPickProdResponseDto memberPickProdResponseDto;

    @Builder
    public RecommandProduct(Long productId, String productName, String productImg, Long price, ProductCategory category, String productDesc, CorpType pb, Long recommand, Long hit, EventInfoDto eventInfoDto) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.price = price;
        this.category = category;
        this.productDesc = productDesc;
        this.pb = pb;
        this.recommand = recommand;
        this.hit = hit;
        this.eventInfoDto = eventInfoDto;
    }
}
