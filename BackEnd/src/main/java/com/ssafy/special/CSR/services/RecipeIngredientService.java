package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.recipe.RecipeWriteDTO;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.CSR.repositories.RecipeIngredientRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.entity.Product;
import com.ssafy.special.entity.Recipe;
import com.ssafy.special.entity.RecipeIngredient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeIngredientService {

    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;



    /**
     * 재료들을 테이블에 추가합니다.
     */
    public List<RecipeIngredient> writeIngredients(Recipe recipe, List<RecipeWriteDTO.Ingredients> ingredients){
        // 스트림을 통해, 재료들을 모두 엔티티로 변화하고 리스트로 만듭니다.
        return ingredients.stream()
                .map(ingredient -> toIngredientEntity(recipe, ingredient))
                .collect(Collectors.toList());
    }


    /**
     * 재료들을 테이블에서 제거합니다.
     * 레시피의 업데이트 시,기존 재료들을 모두 삭제 상태로 변경합니다.
     */
    public List<RecipeIngredient> deleteIngredients(Long rcpId){

        // 스트림을 통해, 재료들의 isDeleted 컬럼을 모두 true로 변경합니다.
        return recipeIngredientRepository.findAllByRecipe_RecipeId(rcpId).stream()
                .map(RecipeIngredient::deleteIngredient)
                .collect(Collectors.toList());

    }



    public List<String> getIngredientNamesByRecipe(Long rcpId) {
        List<RecipeIngredient> ingredients = recipeIngredientRepository.findAllByRecipe_RecipeId(rcpId);

        return ingredients.stream()
                .map(ingredient -> ingredient.getProduct().getProductName())
                .collect(Collectors.toList());
    }

    /**
     * RecipeWriteDTO의 재료목록을 실제 엔티티로 변환합니다.
     */
    public RecipeIngredient toIngredientEntity(Recipe recipe, RecipeWriteDTO.Ingredients ingredients){
        System.out.println(ingredients.getPrdId());
        Product product = productRepository.findById(ingredients.getPrdId()).orElseThrow();
        return RecipeIngredient.builder()
                .recipe(recipe)
                .product(product)
                .createdAt(LocalDateTime.now())
                .changeable(ingredients.getChangeable())
                .isDeleted(false)
                .build();
    }
}