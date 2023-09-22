package com.ssafy.special.member.model.vo;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class MemberUpdateDTO {
    private String nickname;
    private boolean emailRecieve;
    private String memberImg;
}
