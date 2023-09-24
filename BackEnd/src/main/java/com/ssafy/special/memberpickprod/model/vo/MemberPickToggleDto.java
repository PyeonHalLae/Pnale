package com.ssafy.special.memberpickprod.model.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberPickToggleDto {
    Long memberId;
    Long productId;
}
