package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.recipe.RecipeWriteDTO;
import com.ssafy.special.CSR.repositories.MemberPickRecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.RecipeIngredient;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.ssafy.special.CSR.dtos.recipe.RecipeListDTO;
import com.ssafy.special.CSR.dtos.recipe.RecipeRecommendDTO;
import com.ssafy.special.entity.Recipe;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import com.ssafy.special.CSR.repositories.S3Repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final MemberPickRecipeRepository memberPickRecipeRepository;
    private final MemberRepository memberRepository;
    private final RecipeIngredientService recipeIngredientService;
    private final RecipeRepository recipeRepository;
    //아니 왜이래

    /**
     * 레시피를 추가합니다.
     */
    @Transactional
    public void writeRecipe(Long memberId, RecipeWriteDTO info){
        Recipe recipe = toRecipeEntity(memberId, info);
        List<RecipeIngredient> lists = recipeIngredientService.writeIngredients(recipe, info.getIngredients());
        recipe.setIngredients(lists);

        recipeRepository.save(recipe);
    }

    /**
     * 레시피를 업데이트합니다.
     */
    @Transactional
    public void updateRecipe(Long rcpId, RecipeWriteDTO info){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        List<RecipeIngredient> lists = recipeIngredientService.writeIngredients(recipe, info.getIngredients());
        recipe.updateRecipe(info.getRcpName(),info.getRcpThumb(), info.getRcpSimp(),info.getRcpDesc(), info.getRcpVideo(), lists);

        recipeRepository.save(recipe);
    }

    /**
     * 레시피를 삭제합니다.
     */
    @Transactional
    public void deleteRecipe(Long rcpId){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        List<RecipeIngredient> lists = recipeIngredientService.deleteIngredients(rcpId);
        recipe.deleteRecipe(lists);

        recipeRepository.save(recipe);
    }

    // 추천 레시피 출력
    public RecipeRecommendDTO getRecommendData(Long memberId){
        Recipe recipe = recipeRepository.findRecipeByWeightedValue().get(0);
        List<String> ingredients = recipeIngredientService.getIngredientNamesByRecipe(recipe.getRecipeId());
        boolean myLike =  memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId()).orElse(false);
        return RecipeRecommendDTO.builder()
                .rcpId(recipe.getRecipeId())
                .rcpName(recipe.getRecipeName())
                .member(recipe.getMember().toViewDTO())
                .ingredients(ingredients)
                .rcpTemp(recipe.getRecipeSimple())
                .likeCnt(recipe.getLikeCnt())
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

    /**
     * RecipeWriteDTO를 실제 엔티티로 변환합니다.
     */
    public Recipe toRecipeEntity(Long memberId, RecipeWriteDTO recipeInfo){
        Member member = memberRepository.findById(memberId).orElseThrow();
        boolean influence = member.getRole().name().equals("ADMIN");
        return Recipe.builder()
                .writer(member)
                .recipeName(recipeInfo.getRcpName())
                .recipeSimple(recipeInfo.getRcpSimp())
                .recipeDesc(recipeInfo.getRcpDesc())
                .recipeThumbnail(recipeInfo.getRcpThumb())
                .recipeVideoUrl(recipeInfo.getRcpVideo())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isDeleted(false)
                .influence(influence)
                .build();
    }
}