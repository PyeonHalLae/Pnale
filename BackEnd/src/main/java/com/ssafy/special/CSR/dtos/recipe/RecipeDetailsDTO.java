package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDetailsDTO {
    // 레시피 미리보기에 나타나는 재료이름입니다.
    private Long rcpId;
    private String rcpName;
    private MemberViewDTO writer;
    private List<ProductInRecipeDTO> ingredients;
    private String rcpSimple;
    private Long likeCnt;
    private Long replyCnt;
    private Long viewCnt;
    private String rcpDesc;
    private String rcpThumbnail;
    private String rcpVideo;
    private LocalDateTime createdAt;
    private boolean influence;
    private boolean like;
    private boolean myRecipe;
}
