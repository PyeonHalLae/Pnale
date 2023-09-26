package com.ssafy.special.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberViewDTO {
    // 레시피 게시판 등에 사용되는, 사용자의 닉네임과 프로필 사진만을 반환하는 DTO
    // 사용자 클릭시 작성글을 볼 수도 있으므로 memberId도 함께 반환
    private Long memberId;
    private String nickname;
    private String memberImg;
}
