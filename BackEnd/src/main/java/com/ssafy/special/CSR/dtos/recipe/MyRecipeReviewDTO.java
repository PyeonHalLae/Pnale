package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO;
import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeReview;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyRecipeReviewDTO {
    // 레시피 미리보기에 나타나는 재료이름입니다.
    private Long rcpId;
    private Long revId;
    private String rcpName;
    private String content;
    private LocalDateTime createdAt;

    public static MyRecipeReviewDTO toDTO(RecipeReview review, Recipe recipe){
        return MyRecipeReviewDTO.builder()
                .rcpId(recipe.getRecipeId())
                .revId(review.getReviewId())
                .rcpName(recipe.getRecipeName())
                .content(review.getContent())
                .createdAt(review.getCreatedAt())
                .build();
    }
}