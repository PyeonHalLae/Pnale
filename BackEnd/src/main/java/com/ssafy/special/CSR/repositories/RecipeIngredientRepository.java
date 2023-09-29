package com.ssafy.special.CSR.repositories;
import com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO;
import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    List<RecipeIngredient> findAllByRecipe_RecipeId(Long rcpId);

    @Query("SELECT new com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO(p.productId, p.productName, p.price, r.changeable) " +
            "FROM RecipeIngredient r " +
            "JOIN r.product p " +
            "WHERE r.recipe.recipeId = :recipeId AND r.isDeleted = false")
    List<ProductInRecipeDTO> findProductsInRecipe(Long recipeId);
}