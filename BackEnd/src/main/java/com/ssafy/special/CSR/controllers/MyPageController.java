package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.ProductService;
import com.ssafy.special.CSR.services.RecipeService;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value ={"/api/mypage", "/api/auth/mypage"} )
@RequiredArgsConstructor
public class MyPageController {
    private final ProductService productService;
    private final RecipeService recipeService;

    //내가 찜한 상품
    @GetMapping("/pick_prod/{memberId}")
    public DataResponse<?> getUserPickProducts(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){
        return new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.", productService.findPickProd(pageable, memberId));
    }

    //내가 찜한 레시피
    @GetMapping("/pick_recipe/{memberId}")
    public DataResponse<?> getUserPickRecipes(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){
        return new DataResponse<>(200, "유저가 찜한 레시피들을 반환합니다.", recipeService.getAllLists(memberId, pageable.getPageNumber(), pageable.getPageSize()));
        //return new new DataResponse<>(200, "유저가 찜한 레시피들을 반환합니다.", recipeService.getAllLists(pageable, memberId));
    }

    //내 레시피
    @GetMapping("/recipe/{memberId}")
    public DataResponse<?> getUserRecipes(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){

        return new DataResponse<>(200, "유저가 업로드한 레시피들을 반환합니다.");
    }
    //내가 작서한 댓글 목록
    @GetMapping("/comment/{memberId}")
    public DataResponse<?> getUserComments(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){
        return new DataResponse<>(200, "유저가 작성한 댓글들을 반환합니다.");
    }

}
