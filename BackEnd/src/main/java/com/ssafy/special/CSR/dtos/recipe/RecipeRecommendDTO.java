package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRecommendDTO {
    // 레시피 미리보기에 나타나는 재료이름입니다.
    private Long rcpId;
    private String rcpName;
    private MemberViewDTO member;
    private List<String> ingredients;
    private String rcpTemp;
    private Long likeCnt;
    private Long replyCnt;
    private Long viewCnt;
    private boolean influence;
    private boolean like;
}