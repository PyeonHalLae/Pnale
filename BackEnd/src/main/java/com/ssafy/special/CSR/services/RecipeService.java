package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.repositories.RecipeIngredientRepository;
import com.ssafy.special.CSR.repositories.RecipeIngredientService;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.ssafy.special.CSR.repositories.S3Repository;
import com.ssafy.special.CSR.repositories.vo.RecipeListDTO;
import com.ssafy.special.CSR.repositories.vo.RecipeRecommendDTO;
import com.ssafy.special.entity.Recipe;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    S3Repository.MemberPickRecipeRepository memberPickRecipeRepository;
    RecipeIngredientRepository recipeIngredientRepository;
    RecipeIngredientService recipeIngredientService;
    RecipeRepository recipeRepository;

    // 추천 레시피 출력
    public RecipeRecommendDTO getRecommendData(Long memberId){
        Recipe recipe = recipeRepository.findRecipeByWeightedValue().get(0);
        List<String> ingredients = recipeIngredientService.getIngredientNamesByRecipe(recipe);
        boolean myLike =  memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId()).orElse(false);
        return RecipeRecommendDTO.builder()
                .rcpId(recipe.getRecipeId())
                .rcpName(recipe.getRecipeName())
                .member(recipe.getWriterId().toViewDTO())
                .ingredients(ingredients)
                .rcpTemp(recipe.getRecipeSimple())
                .likeCnt(recipe.getLikes())
                .replyCnt(recipe.getReplyCnt())
                .viewCnt(recipe.getViewCnt())
                .influence(recipe.isInfluence())
                .like(myLike)
                .build();
    }

    public List<RecipeListDTO> getMainListData(Long memberId){
        return makeLists(memberId, recipeRepository.findTop2ByOrderByCreatedAtDesc());
    }

    public List<RecipeListDTO> getAllLists(Long memberId, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipePage = recipeRepository.findAll(pageable).getContent();

        return makeLists(memberId, recipePage);
    }

    public List<RecipeListDTO> makeLists(Long memberId, List<Recipe> recipes){

        return recipes
                .stream()
                .map(recipe -> {
                    Boolean isDeleted = memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId()).orElse(false);
                    return recipe.toListDto(isDeleted);
                })
                .collect(Collectors.toList());
    }
}