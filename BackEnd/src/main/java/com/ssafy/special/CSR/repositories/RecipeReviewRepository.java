package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.MemberPickRecipe;
import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeReview;
import com.ssafy.special.enums.ReviewStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeReviewRepository extends JpaRepository<RecipeReview, Long> {
    Long countByRecipeAndStatusNot(Recipe recipe, ReviewStatusType status);
    Page<RecipeReview> findByMemberMemberIdAndStatusNotAndRecipeIsDeletedFalse(Pageable pageable, Long memberId, ReviewStatusType status);
    Page<RecipeReview> findAllByRecipeAndStatusNot(Recipe recipe, ReviewStatusType status, Pageable pageable);

}
