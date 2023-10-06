package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

/**
 * 레시피 목록에서 나타나는 정보를 전달하기 위한 DTO 입니다.
 * myRecipe는 수정/삭제 버튼을 위해 본인 여부를 알려줍니다.
 */
public class RecipeListDTO {
    private Long rcpId; //필요
    private String rcpName; //확인
    private MemberViewDTO member; //확인
    private String rcpThumbnail; //확인
    private LocalDateTime createdAt; //확인
    private String rcpSimple; //어디에 필요한거지
    private Long likeCnt; //확인
    private Long replyCnt; //확인
    private Long viewCnt; //확인
    private boolean influence; //확인
    private boolean like; //확인
    private boolean myRecipe; //필요
}