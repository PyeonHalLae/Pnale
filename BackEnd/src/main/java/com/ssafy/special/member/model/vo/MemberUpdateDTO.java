package com.ssafy.special.member.model.vo;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class MemberUpdateDTO {
    private String nickname;
    private boolean emailReceive;
    private String memberImg;
}
