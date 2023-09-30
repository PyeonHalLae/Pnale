package com.ssafy.special.CSR.controllers;

import co.elastic.clients.elasticsearch.nodes.Http;
import com.ssafy.special.CSR.dtos.recipe.*;
import com.ssafy.special.CSR.repositories.RecipeReviewRepository;
import com.ssafy.special.CSR.services.RecipeService;
import com.ssafy.special.exception.AuthException;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
@RestController
@RequestMapping(value = {"/api/recipe", "/api/auth/recipe"})
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private final RecipeReviewRepository recipeReviewRepository;
    /**
     * 레시피 페이지에 들어갔을 때의 요청에 대한 컨트롤러입니다.
     * 기본적으로 추천 레시피 한가지와 최신 레시피 두가지를 나타내줍니다.
     */
    @GetMapping("")
    public DataResponse<?> getMainpage(HttpServletRequest request) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        DataResponse<RecipeMainPageDTO> response = new DataResponse<>(200, "레시피 메인 페이지가 로드되었습니다");
        RecipeRecommendDTO rm = recipeService.getRecommendData(memberId);
        List<RecipeListDTO> rl = recipeService.getMainListData(memberId);

        response.setData(RecipeMainPageDTO.builder().best(rm).recipes(rl).build());
        return response;
    }

    /**
     * 디테일 페이지에 들어갔을 때의 요청에 대한 컨트롤러입니다.
     * 레시피의 자세한 정보와 해당 레시피의 첫 페이지 댓글들을 출력해줍니다.
     */
    @GetMapping("/detail")
    public DataResponse<?> getDetailPage(HttpServletRequest request, @RequestParam(value = "rcpId") Long rcpId){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        DataResponse<RecipeDetailsDTO> response = new DataResponse<>(200, "디테일 페이지를 불러오는 데 성공했습니다.");
        RecipeDetailsDTO detail = recipeService.getDetailRecipe(memberId, rcpId);

        response.setData(detail);

        return response;
    }

    /**
     * 페이지네이션을 통해 가져오는 레시피 리스트입니다.
     */
    @GetMapping("/all")
    public DataResponse<?> getAllLists(HttpServletRequest request,
                                       @PageableDefault(page=0, size=10, sort="recipeId", direction = Sort.Direction.DESC) Pageable pageable) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        Page<RecipeListDTO> list = recipeService.getAllLists(memberId, pageable);

        if(list.isEmpty()) {
            return new DataResponse<>(204, "해당 레시피의 리뷰가 존재하지 않습니다.");
        }
        return new DataResponse<>(200, pageable.getPageNumber()+"번째 레시피 목록을 불러옵니다.", list);
    }

    /**
     * 레시피를 작성하는 컨트롤러입니다.
     */
    @PostMapping("/form")
    public CustomResponse createRecipe(HttpServletRequest request, @RequestBody RecipeWriteDTO recipeWriteDTO){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        recipeService.writeRecipe(memberId, recipeWriteDTO);

        return new CustomResponse(201, "레시피 등록 성공");
    }

    /**
     * 레시피를 수정하는 컨트롤러입니다.
     */
    @PatchMapping("/form")
    public CustomResponse updateRecipe(HttpServletRequest request, @RequestBody RecipeWriteDTO recipeWriteDTO, @RequestParam(value="rcpId") Long rcpId){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        recipeService.updateRecipe(rcpId, recipeWriteDTO);

        return new CustomResponse(200, "레시피 수정 성공");
    }

    /**
     * 레시피를 삭제하는 컨트롤러입니다.
     */
    @DeleteMapping("/form")
    public CustomResponse deleteRecipe(HttpServletRequest request, @RequestParam(value="rcpId") Long rcpId){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        recipeService.deleteRecipe(rcpId);

        return new CustomResponse(200, "레시피 삭제 성공");
    }


    /**
     * 해당 레시피의 좋아요 여부를 토글합니다.
     */
    @PatchMapping("/like")
    public CustomResponse toggleLike(HttpServletRequest request, @RequestParam(value = "rcpId")Long rcpId){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
        recipeService.toggleLike(memberId, rcpId);

        return new CustomResponse(200, "좋아요가 변경되었습니다.");
    }


    /**
     * 레시피에 대한 페이지네이션 된 리뷰를 가져오는 컨트롤러입니다.
     * 만약 레시피가 하나도 없으면 204 코드를 반환하여 댓글이 없는 프론트페이지를 반환할 수 있도록 합니다.
     */
    @GetMapping("/review")
    public DataResponse<?> readReview(HttpServletRequest request, @RequestParam(value = "rcpId") Long rcpId, @PageableDefault(page=0, size=5, sort="reviewId", direction = Sort.Direction.DESC) Pageable pageable){
        DataResponse<Page<RecipeReviewDTO>> response;
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        Page<RecipeReviewDTO> list = recipeService.readAllReviews(rcpId, memberId, pageable);

        if(list.isEmpty()) {
            response = new DataResponse<>(204, "해당 레시피의 리뷰가 존재하지 않습니다.");
            return response;
        }

        response = new DataResponse<>(200, rcpId+"번 레시피의 "+ pageable.getPageNumber() +" 페이지 리뷰를 불러왔습니다.");
        response.setData(list);

        return response;
    }

    /**
     * 해당 레시피에 대한 댓글을 작성하는 컨트롤러입니다.
     */
    @PostMapping(value= "/review", consumes = "text/plain")
    public CustomResponse writeReview(HttpServletRequest request, @RequestParam(value = "rcpId") Long rcpId, @RequestBody String content){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        recipeService.writeReview(rcpId, memberId, content);

        return new CustomResponse(201, "새로운 댓글을 작성했습니다.");
    }

    /**
     * 해당 레시피에 대한 댓글을 수정하는 컨트롤러입니다.
     */
    @PatchMapping(value= "/review", consumes = "text/plain")
    public CustomResponse updateReview(HttpServletRequest request, @RequestParam(value = "revId") Long revId, @RequestBody String content){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        recipeService.updateReview(revId, content);

        return new CustomResponse(200, "기존 댓글을 수정했습니다.");
    }

    /**
     * 해당 레시피에 대한 댓글을 삭제하는 컨트롤러입니다.
     */
    @DeleteMapping(value= "/review")
    public CustomResponse deleteReview(HttpServletRequest request, @RequestParam(value = "revId") Long revId){
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);

        recipeService.deleteReview(revId);

        return new CustomResponse(200, revId+"번 댓글을 삭제했습니다.");
    }


}