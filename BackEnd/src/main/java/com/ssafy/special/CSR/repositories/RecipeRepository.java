package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    // JPQL을 사용해 가중치를 적용하고 가장 높은 값을 갖는 Recipe를 조회합니다.
    @Query("SELECT r FROM Recipe r ORDER BY (r.likeCnt * 0.5 + r.viewCnt * 0.01) DESC")
    List<Recipe> findRecipeByWeightedValue();
    List<Recipe> findTop2ByOrderByCreatedAtDesc();

    Page<Recipe> findByWriterMemberId(Pageable pageable, Long writerId);

    @Query("SELECT mpr.recipe FROM MemberPickRecipe mpr WHERE mpr.member.memberId = :memberId AND mpr.isDeleted = false")
    Page<Recipe> findLikedRecipesByMemberId(@Param("memberId") Long memberId, Pageable pageable);


    @Query("SELECT r FROM RecipeIngredient ri " +
            "LEFT JOIN Recipe r " +
            "ON ri.recipe.recipeId = r.recipeId " +
            "where ri.product.productId = :productId ")
    Page<Recipe> findRecipeByProductId(Pageable pageable,
                                       @Param("productId") Long productId);

}
