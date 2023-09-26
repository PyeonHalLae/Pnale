package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.MemberPickRecipe;
import com.ssafy.special.entity.S3File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberPickRecipeRepository extends JpaRepository<MemberPickRecipe, Long> {
    @Query("SELECT m.isDeleted FROM MemberPickRecipe m WHERE m.member.memberId = :memberId AND m.recipe.recipeId = :recipeId")
    Optional<Boolean> findIsDeletedByMemberAndRecipe(@Param("memberId") Long memberId, @Param("recipeId") Long recipeId);
}

