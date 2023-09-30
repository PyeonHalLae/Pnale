package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO;
import com.ssafy.special.CSR.dtos.recipe.*;
import com.ssafy.special.CSR.repositories.MemberPickRecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeIngredientRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeReviewRepository;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.RecipeIngredient;
import com.ssafy.special.entity.RecipeReview;
import com.ssafy.special.enums.ReviewStatusType;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.member.model.MemberRepository;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.ssafy.special.entity.Recipe;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

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
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeReviewRepository recipeReviewRepository;
    //아니 왜이래

    /**
     * 레시피를 추가합니다.
     */
    @Transactional
    public Long writeRecipe(Long memberId, RecipeWriteDTO info){
        Recipe recipe = toRecipeEntity(memberId, info);
        List<RecipeIngredient> lists = recipeIngredientService.writeIngredients(recipe, info.getIngredients());
        recipe.setIngredients(lists);

        recipe = recipeRepository.save(recipe);

        return recipe.getRecipeId();
    }

    /**
     * 레시피를 업데이트합니다.
     */
    @Transactional
    public Long updateRecipe(Long rcpId, RecipeWriteDTO info){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        List<RecipeIngredient> lists = recipeIngredientService.writeIngredients(recipe, info.getIngredients());
        recipe.updateRecipe(info.getRcpName(),info.getRcpThumb(), info.getRcpSimp(),info.getRcpDesc(), info.getRcpVideo(), lists);

        recipeRepository.save(recipe);

        return recipe.getRecipeId();
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

    /**
     * 디테일페이지에 출력할 레시피입니다.
     */
    public RecipeDetailsDTO getDetailRecipe(Long memberId, Long recipeId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        List<ProductInRecipeDTO> ingredients = recipeIngredientRepository.findProductsInRecipe(recipe.getRecipeId());
        boolean myLike =  memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                .map(isDeleted -> !isDeleted).orElse(false);
        return RecipeDetailsDTO.builder()
                .rcpId(recipe.getRecipeId())
                .rcpName(recipe.getRecipeName())
                .writer(recipe.getWriter().toViewDTO())
                .ingredients(ingredients)
                .rcpSimple(recipe.getRecipeSimple())
                .rcpDesc(recipe.getRecipeDesc())
                .rcpThumbnail(recipe.getRecipeThumbnail())
                .rcpVideoUrl(recipe.getRecipeVideoUrl())
                .likeCnt(recipe.getLikeCnt())
                .replyCnt(recipe.getReplyCnt())
                .viewCnt(recipe.getViewCnt())
                .influence(recipe.isInfluence())
                .createdAt(recipe.getCreatedAt())
                .like(myLike)
                .build();
    }

    /**
     * 메인페이지에 출력할 추천레시피입니다.
     */
    public RecipeRecommendDTO getRecommendData(Long memberId){
        // 가중치에 따라 레시피를 하나 불러옵니다.

        Recipe recipe = recipeRepository.findRecipeByWeightedValue().get(0);

        List<String> ingredients = recipeIngredientService.getIngredientNamesByRecipe(recipe.getRecipeId());
        boolean myLike =  memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                .map(isDeleted -> !isDeleted).orElse(false);
        return RecipeRecommendDTO.builder()
                .rcpId(recipe.getRecipeId())
                .rcpName(recipe.getRecipeName())
                .member(recipe.getWriter().toViewDTO())
                .ingredients(ingredients)
                .rcpSimple(recipe.getRecipeSimple())
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

    public List<RecipeListDTO> getAllLists(Long memberId, Pageable pageable){
        List<Recipe> recipePage = recipeRepository.findAll(pageable).getContent();
        return makeLists(memberId, recipePage);
    }
    private List<RecipeListDTO> makeLists(Long memberId, List<Recipe> recipes){
        return recipes
                .stream()
                .map(recipe -> {
                    Boolean like = memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                            .map(isDeleted -> !isDeleted).orElse(false);
                    return recipe.toListDto(like);
                })
                .collect(Collectors.toList());
    }

    /**
     * 레시피(rcpId)에 따른 댓글들을 반환하는 서비스입니다.
     * 해당 레시피의 댓글을 모두 찾고, 스트림을 통해 적당한 DTO(RecipeReviewDTO)로 변환하여 반환합니다.
     * 댓글이 아무것도 없는 경우, null값을 반환하여 컨트롤러가 처리할 수 있도록 합니다.
     */
    private List<RecipeReviewDTO> readAllReviews(Long rcpId, Long memberId, Pageable pageable){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        Page<RecipeReview> lists = recipeReviewRepository.findAllByRecipeAndStatusNot(recipe, ReviewStatusType.DELETED, pageable);
        if(lists.isEmpty()) return null;

        return lists.stream()
                .map(review -> {
                    Member member = review.getMember();
                    MemberViewDTO memberViewDTO = MemberViewDTO.toDTO(member);
                    return RecipeReviewDTO.toDTO(review, memberId, memberViewDTO);
                })
                .collect(Collectors.toList());

    }

    /**
     * 레시피(rcpId)에 댓글을 작성합니다.
     */
    @Transactional
    public void writeReview(Long rcpId, Long memId, String content){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        Member member = memberRepository.findById(memId).orElseThrow();

        RecipeReview review = RecipeReview.builder()
                .content(content)
                .member(member)
                .recipe(recipe)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .status(ReviewStatusType.NORMAL)
                .build();

        recipe.setReplyCnt(recipe.getReplyCnt()+1);
        recipe.addReview(review);
        recipeReviewRepository.save(review);
    }

    /**
     * 특정 댓글(revId)을 수정합니다.
     */
    @Transactional
    public void updateReview(Long revId, String content){
        RecipeReview review = recipeReviewRepository.findById(revId).orElseThrow();
        review.updateReview(content);

        recipeReviewRepository.save(review);
    }

    /**
     * 특정 댓글(revId)을 삭제합니다.
     */
    @Transactional
    public void deleteReview(Long revId){
        RecipeReview review = recipeReviewRepository.findById(revId).orElseThrow();
        Recipe recipe = review.getRecipe();
        review.deleteReview();

        recipe.setReplyCnt(recipe.getReplyCnt()-1);
        recipe.addReview(review);
        recipeReviewRepository.save(review);
        recipeReviewRepository.save(review);
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