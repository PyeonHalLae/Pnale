package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    List<RecipeIngredient> findAllByRecipe_RecipeId(Long rcpId);
}
