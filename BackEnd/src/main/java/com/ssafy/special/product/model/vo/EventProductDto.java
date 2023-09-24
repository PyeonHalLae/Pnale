package com.ssafy.special.product.model.vo;

import com.ssafy.special.memberpickprod.model.vo.MemberPickProdInfoDto;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
public class EventProductDto {
    ProductInfoDto productInfo;
    MemberPickProdInfoDto userLikeProd;
    EventInfoDto evnetInfo;

    @Builder
    public EventProductDto(ProductInfoDto productInfoDto, MemberPickProdInfoDto userLikeProdResponseDto, EventInfoDto eventInfoDto) {
        this.productInfo = productInfoDto;
        this.userLikeProd = userLikeProdResponseDto;
        this.evnetInfo = eventInfoDto;
    }
}
