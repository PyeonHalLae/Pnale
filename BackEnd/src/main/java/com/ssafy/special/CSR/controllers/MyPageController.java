package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.dtos.recipe.MyRecipeReviewDTO;
import com.ssafy.special.CSR.dtos.recipe.RecipeListDTO;
import com.ssafy.special.CSR.repositories.MemberPickRecipeRepository;
import com.ssafy.special.CSR.repositories.RecipeReviewRepository;
import com.ssafy.special.CSR.services.ProductService;
import com.ssafy.special.CSR.services.RecipeService;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.member.model.MemberService;

import com.ssafy.special.enums.ReviewStatusType;
import com.ssafy.special.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value ={"/api/mypage", "/api/auth/mypage"} )
@RequiredArgsConstructor
public class MyPageController {
    private final ProductService productService;
    private final RecipeService recipeService;
    private final MemberService memberService;
    private final RecipeReviewRepository recipeReviewRepository;
    private final MemberPickRecipeRepository memberPickRecipeRepository;

    @GetMapping("")
    public DataResponse<?> getMemberData(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, "유저 정보를 반환합니다.", memberService.findMemberInfo(memberId));
    }

    //내가 찜한 상품
    @GetMapping("/pick_prod")
    public DataResponse<?> getUserPickProducts(HttpServletRequest request, @PageableDefault(size = 9) Pageable pageable){
        Long memberId = (Long) request.getAttribute("memberId");
        return new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.", productService.findPickProd(pageable, memberId));
    }

    /**
     * 내가 찜한 레시피 리스트를 반환합니다.
     */
    @GetMapping("/pick_recipe")
    public DataResponse<?> getUserPickRecipes(HttpServletRequest request,@PageableDefault(size = 9) Pageable pageable){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        Page<RecipeListDTO> lists = recipeService.getlikeLists(memberId, pageable);

        if(lists.isEmpty()) return new DataResponse<>(204, "현재 페이지에 대한 정보가 없습니다.", null);
        return new DataResponse<>(200, "유저가 찜한 레시피 목록을 반환합니다.", lists);
    }

    //내 레시피
    @GetMapping("/recipe")
    public DataResponse<?> getUserRecipes(HttpServletRequest request,@PageableDefault(size = 9) Pageable pageable){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId != null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        Page<RecipeListDTO> lists = recipeService.getMyLists(memberId, pageable);
        if(lists.isEmpty()) return new DataResponse<>(204, "현재 페이지에 대한 정보가 없습니다.", null);
        return new DataResponse<>(200, "유저가 업로드한 레시피들을 반환합니다.", lists);

    }

    //내가 작서한 댓글 목록
    @GetMapping("/comment")
    public DataResponse<?> getUserComments(HttpServletRequest request,@PageableDefault(size = 9) Pageable pageable){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        Page<MyRecipeReviewDTO> lists = recipeService.myReviewList(memberId, pageable);

        if(lists.isEmpty()) return new DataResponse<>(204, "현재 페이지에 대한 정보가 없습니다.", null);
        return new DataResponse<>(200, "유저가 작성한 댓글들을 반환합니다.", lists);
    }
}
