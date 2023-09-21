package com.ssafy.special.product;

import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.product.model.ProductService;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor //해당 어노테이션
public class ProductController {
    private final ProductService productService;
    @GetMapping("")
    public DataResponse<?> getAllProducts(Pageable pageable){
        DataResponse<Page<ProductResponseDto>> response = new DataResponse<>(200, pageable.getPageNumber() + "페이지 상품 정보를 반환합니다.");
        //if(유저 로그인 했을 떄){}
        //else if(유저 로그인 안했을 떄 ){}
        response.setData(productService.findAllProducts(pageable));
        return response;
    }

    //제품 상세 보기
    @GetMapping("/{productId}")
    public DataResponse<?> getProduct(@PathVariable Long productId) {
        DataResponse<ProductResponseDto> response = new DataResponse<>(200, "상품 상세 정보를 반환합니다.");
        response.setData(productService.findProduct(productId));
        return response;
    }
}
