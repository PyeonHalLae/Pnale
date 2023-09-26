package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Recipe;

public interface RecipeReviewRepository {
    Long countByRecipeId(Recipe recipe);
}
