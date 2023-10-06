package com.ssafy.special.CSR.dtos.memberpick;

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
