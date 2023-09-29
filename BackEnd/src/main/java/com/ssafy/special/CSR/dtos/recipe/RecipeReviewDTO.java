package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.entity.RecipeReview;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeReviewDTO {
    private Long revId;
    private MemberViewDTO writer;
    private String content;
    private LocalDateTime createdAt;
    private boolean myReview;

    public static RecipeReviewDTO toDTO(RecipeReview review, Long memberId, MemberViewDTO writer){
        boolean myReview = memberId.equals(writer.getMemberId());
        return RecipeReviewDTO.builder()
                .revId(review.getReviewId())
                .writer(writer)
                .content(review.getContent())
                .createdAt(review.getCreatedAt())
                .myReview(myReview)
                .build();
    }
}