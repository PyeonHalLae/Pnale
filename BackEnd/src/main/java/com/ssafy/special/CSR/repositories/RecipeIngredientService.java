package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeIngredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeIngredientService {

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;


    public List<String> getIngredientNamesByRecipe(Recipe recipe) {
        List<RecipeIngredient> ingredients = recipeIngredientRepository.findByRecipeOrderByIngredientSeq(recipe);

        return ingredients.stream()
                .map(ingredient -> ingredient.getProduct().getProductName())
                .collect(Collectors.toList());
    }
}