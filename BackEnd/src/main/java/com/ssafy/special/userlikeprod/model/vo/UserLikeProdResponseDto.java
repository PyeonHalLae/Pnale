package com.ssafy.special.userlikeprod.model.vo;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import com.ssafy.special.eventproduct.model.vo.EventProductDto;
import lombok.*;

@Setter
@Getter
public class UserLikeProdResponseDto {
    Product product;
    boolean emailRecevie;

    EventProductDto eventProductDto;

    @Builder
    public UserLikeProdResponseDto(Product product, boolean emailRecevie, EventProductDto eventProductDto) {
        this.product = product;
        this.emailRecevie = emailRecevie;
        this.eventProductDto = eventProductDto;
    }
}
