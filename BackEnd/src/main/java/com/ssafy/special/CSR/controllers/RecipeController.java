package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.dtos.recipe.RecipeListDTO;
import com.ssafy.special.CSR.dtos.recipe.RecipeMainPageDTO;
import com.ssafy.special.CSR.dtos.recipe.RecipeRecommendDTO;
import com.ssafy.special.CSR.dtos.recipe.RecipeWriteDTO;
import com.ssafy.special.CSR.services.RecipeService;
import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {


    private final RecipeService recipeService;

    @GetMapping("/")
    public DataResponse<?> getMainpage(HttpServletRequest request) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) memberId = 0L;

        DataResponse<RecipeMainPageDTO> response = new DataResponse<>(200, "레시피 페이지 로드");
        RecipeRecommendDTO rm = recipeService.getRecommendData(memberId);
        List<RecipeListDTO> rl = recipeService.getMainListData(memberId);

        response.setData(RecipeMainPageDTO.builder().best(rm).recipes(rl).build());

        return response;
    }

    @GetMapping("/all")
    public DataResponse<?> getAllLists(HttpServletRequest request,
                                       @RequestParam(value = "page", defaultValue = "1") int page,
                                       @RequestParam(value = "size", defaultValue = "5") int size) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) memberId = 0L;

        DataResponse<List<RecipeListDTO>> response = new DataResponse<>(200, "레시피 전체목록 로드");
        List<RecipeListDTO> lists = recipeService.getAllLists(memberId, size, page);

        response.setData(lists);

        return response;
    }

    /**
     * 레시피를 작성하는 컨트롤러입니다.
     */
    @PostMapping("/form")
    public CustomResponse createRecipe(HttpServletRequest request, @RequestBody RecipeWriteDTO recipeWriteDTO){
        Long memberId = (Long)request.getAttribute("memberId");
        recipeService.writeRecipe(memberId, recipeWriteDTO);

        return new CustomResponse(200, "레시피 등록 성공");
    }
}
