package com.ssafy.special.CSR.repositories.vo;

import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeListDTO {
    // 레시피 미리보기에 나타나는 재료이름입니다.
    private Long rcpId;
    private String rcpName;
    private MemberViewDTO member;
    private LocalDateTime createdAt;
    private String rcpTem;
    private Long likeCnt;
    private Long replyCnt;
    private Long viewCnt;
    private boolean influence;
    private boolean like;
}