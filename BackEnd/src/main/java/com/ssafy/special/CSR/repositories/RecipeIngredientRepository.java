package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    List<RecipeIngredient> findByRecipeOrderByIngredientSeq(Recipe recipe);
}
