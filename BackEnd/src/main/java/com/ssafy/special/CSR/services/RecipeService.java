package com.ssafy.special.CSR.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.special.CSR.dtos.product.ProductInRecipeDTO;
import com.ssafy.special.CSR.dtos.recipe.*;
import com.ssafy.special.CSR.repositories.MemberPickRecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeIngredientRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeReviewRepository;
import com.ssafy.special.entity.*;
import com.ssafy.special.enums.ReviewStatusType;
import com.ssafy.special.exception.AuthException;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.member.model.MemberRepository;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;


import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
    private final StringRedisTemplate stringRedisTemplate;
    private final ObjectMapper objectMapper;


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
        recipeIngredientService.deleteIngredients(rcpId);
        List<RecipeIngredient> lists = recipeIngredientService.writeIngredients(recipe, info.getIngredients());
        recipe.updateRecipe(info.getRcpName(),info.getRcpThumbnail(), info.getRcpSimple(),info.getRcpDesc(), info.getRcpVideo(), lists);

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
    @Transactional
    public RecipeDetailsDTO getDetailRecipe(Long memberId, Long recipeId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if(recipe.isDeleted()) throw new AuthException(CustomErrorCode.NOT_AVAILABLE);
        if(!recipe.getWriter().getMemberId().equals(memberId)) recipe.setViewCnt(recipe.getViewCnt()+1);
        List<ProductInRecipeDTO> ingredients = recipeIngredientRepository.findProductsInRecipe(recipe.getRecipeId());
        boolean myRecipe = recipe.getWriter().getMemberId().equals(memberId);
        boolean myLike =  memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                .map(isDeleted -> !isDeleted).orElse(false);
        recipeRepository.save(recipe);
        return RecipeDetailsDTO.builder()
                .rcpId(recipe.getRecipeId())
                .rcpName(recipe.getRecipeName())
                .writer(recipe.getWriter().toViewDTO())
                .ingredients(ingredients)
                .rcpSimple(recipe.getRecipeSimple())
                .rcpDesc(recipe.getRecipeDesc())
                .rcpThumbnail(recipe.getRecipeThumbnail())
                .rcpVideo(recipe.getRecipeVideoUrl())
                .likeCnt(recipe.getLikeCnt())
                .replyCnt(recipe.getReplyCnt())
                .viewCnt(recipe.getViewCnt())
                .influence(recipe.isInfluence())
                .createdAt(recipe.getCreatedAt())
                .like(myLike)
                .myRecipe(myRecipe)
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
                .rcpThumbnail(recipe.getRecipeThumbnail())
                .rcpVideoUrl(recipe.getRecipeVideoUrl())
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

    /**
     * 페이지네이션한 리스트를 반환하는 칭구칭구
     */
    public Page<RecipeListDTO> getAllLists(Long memberId, Pageable pageable){
        Page<Recipe> recipePage = recipeRepository.findByIsDeletedFalse(pageable);
        return makePages(memberId, recipePage, false, false);
    }

    /**
     * 내가 쓴 레시피 리스트를 반환합니다.
     */
    public Page<RecipeListDTO> getMyLists(Long memberId, Pageable pageable){
        Page<Recipe> recipePage = recipeRepository.findByWriterMemberIdAndIsDeletedFalse(pageable,memberId);
        return makePages(memberId, recipePage, false, true);
    }


    /**
     * 내가 찜한 레시피 리스트를 반환합니다.
     */
    public Page<RecipeListDTO> getlikeLists(Long memberId, Pageable pageable){
        Page<Recipe> recipePage = recipeRepository.findLikedRecipesByMemberId(memberId, pageable);
        return makePages(memberId, recipePage, true, false);
    }

    /**
     * recipes 목록을 RecipeListDTO 목록으로 변경해주는 메소드입니다.
     */
    public List<RecipeListDTO> makeLists(Long memberId, List<Recipe> recipes){
        return recipes.stream()
                .map(recipe -> {
                    boolean like = memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                            .map(isDeleted -> !isDeleted).orElse(false);
                    boolean myRecipe = recipe.getWriter().getMemberId().equals(memberId);
                    return recipe.toListDto(like, myRecipe);
                })
                .collect(Collectors.toList());
    }

    /**
     * recipes 목록을 RecipeListDTO 페이지으로 변경해주는 메소드입니다.
     * 최적화를 위하여, 이미 찜했거나 자신의 것임이 연산된 경우엔 삼항연산자로 선반영합니다.
     */
    public Page<RecipeListDTO> makePages(Long memberId, Page<Recipe> recipes, boolean isLike, boolean isMine){
        List<RecipeListDTO> list = recipes.stream()
                .map(recipe -> {
                    boolean like = isLike?isLike:memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, recipe.getRecipeId())
                            .map(isDeleted -> !isDeleted).orElse(false);
                    boolean myRecipe = isMine?isMine:recipe.getWriter().getMemberId().equals(memberId);
                    return recipe.toListDto(like, myRecipe);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(list, recipes.getPageable(), recipes.getTotalElements());
    }

    /**
     * 레시피(rcpId)에 따른 댓글들을 반환하는 서비스입니다.
     * 해당 레시피의 댓글을 모두 찾고, 스트림을 통해 적당한 DTO(RecipeReviewDTO)로 변환하여 반환합니다.
     * 댓글이 아무것도 없는 경우, null값을 반환하여 컨트롤러가 처리할 수 있도록 합니다.
     */

    public Page<RecipeReviewDTO> readAllReviews(Long rcpId, Long memberId, Pageable pageable){
        Recipe recipe = recipeRepository.findById(rcpId).orElseThrow();
        Page<RecipeReview> lists = recipeReviewRepository.findAllByRecipeAndStatusNot(recipe, ReviewStatusType.DELETED, pageable);

        List<RecipeReviewDTO> DTOlist = lists.getContent().stream()
                .map(review -> {
                    Member member = review.getMember();
                    MemberViewDTO memberViewDTO = MemberViewDTO.toDTO(member);
                    return RecipeReviewDTO.toDTO(review, memberId, memberViewDTO);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(DTOlist, lists.getPageable(), lists.getTotalElements());

    }

    /**
     * 레시피(rcpId)에 댓글을 작성합니다.
     * cascade를 이용하여, recipe의 ReplyCnt를 하나 올리고 동시에 review를 테이블에 추가하는 방식입니다.
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
     * cascade를 사용하여 recipe의 replyCnt를 하나 줄여줍니다.
     */
    @Transactional
    public void deleteReview(Long revId){
        RecipeReview review = recipeReviewRepository.findById(revId).orElseThrow();
        Recipe recipe = review.getRecipe();
        if(!review.getStatus().equals(ReviewStatusType.DELETED)){
            review.deleteReview();
            recipe.setReplyCnt(recipe.getReplyCnt()-1);
            recipe.addReview(review);
            recipeReviewRepository.save(review);
        }
    }


    /**
     * RecipeWriteDTO를 실제 엔티티로 변환합니다.
     */
    private Recipe toRecipeEntity(Long memberId, RecipeWriteDTO recipeInfo){
        Member member = memberRepository.findById(memberId).orElseThrow();
        boolean influence = member.getRole().name().equals("ADMIN");
        return Recipe.builder()
                .writer(member)
                .recipeName(recipeInfo.getRcpName())
                .recipeSimple(recipeInfo.getRcpSimple())
                .recipeDesc(recipeInfo.getRcpDesc())
                .recipeThumbnail(recipeInfo.getRcpThumbnail())
                .recipeVideoUrl(recipeInfo.getRcpVideo())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .replyCnt(0L)
                .viewCnt(0L)
                .likeCnt(0L)
                .isDeleted(false)
                .influence(influence)
                .build();
    }

    /**
     * 토글입니다.
     */

    @Transactional
    public void toggleLike(Long memberId, Long recipeId){
        MemberPickRecipe like = memberPickRecipeRepository.findByMemberAndRecipe(memberId, recipeId)
                .orElseGet(() -> {
                    Member member = memberRepository.findById(memberId)
                            .orElseThrow(() -> new EntityNotFoundException("Member not found with ID: " + memberId));
                    Recipe recipe = recipeRepository.findById(recipeId)
                            .orElseThrow(() -> new EntityNotFoundException("Recipe not found with ID: " + recipeId));
                    return MemberPickRecipe.builder()
                            .member(member)
                            .recipe(recipe)
                            .isDeleted(true)
                            .build();
                });
        like.toggleLike();
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        recipe.likeChange(!like.isDeleted());
        memberPickRecipeRepository.save(like);
    }

    /**
     * 마이페이지에서 사용하는 댓글들을 반환하는 서비스입니다.
     * 해당 레시피의 댓글을 모두 찾고, 스트림을 통해 적당한 DTO(RecipeReviewDTO)로 변환하여 반환합니다.
     *
     */

    @Transactional
    public Page<MyRecipeReviewDTO> myReviewList(Long memberId, Pageable pageable) {
        Page<RecipeReview> lists = recipeReviewRepository.findByMemberMemberIdAndStatusNot(pageable, memberId, ReviewStatusType.DELETED);

        List<MyRecipeReviewDTO> DTOlist = lists.stream()
                .map(review -> {
                    Recipe recipe = review.getRecipe();
                    return MyRecipeReviewDTO.toDTO(review, recipe);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(DTOlist, lists.getPageable(), lists.getTotalElements());
    }
}