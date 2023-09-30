package com.ssafy.special.member.model.vo;

import com.ssafy.special.enums.SocialType;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class MemberInfoDTO {
    private Long memberId;
    private String nickname;
    private SocialType socialType;
    private String email;
    private String memberImg;
    private boolean mailReceive;
}
