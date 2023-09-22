package com.ssafy.special.member.model.vo;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class MemberInfoDTO {
    private Long memberId;
    private String nickname;
    private String socialType;
    private String email;
    private String memberImg;
}
