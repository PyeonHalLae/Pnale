package com.ssafy.special.product;

import com.ssafy.special.product.model.EventProductService;
import com.ssafy.special.product.model.vo.EventProductDto;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.product.model.ProductService;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping(value={"/api/product", "/api/auth/product"})
@RequiredArgsConstructor //해당 어노테이션
public class ProductController {
    private final ProductService productService;
    private final EventProductService eventProductService;

    //행사 상품 전체 보기
    @GetMapping("")
    public DataResponse<?> getAllEventProducts(@PageableDefault(size = 12) Pageable pageable){
        DataResponse<Page<EventProductDto>> response = new DataResponse<>(200, pageable.getPageNumber() + " 페이지 상품 정보를 반환합니다.");
        //if(유저 로그인 했을 떄){}
        //else if(유저 로그인 안했을 떄 ){}
        response.setData(eventProductService.findAllEventProducts(pageable));
        return response;
    }

    //추천 상품 반환
    @GetMapping("/recommand")
    public DataResponse<?> getRecommandProducts(@PageableDefault(size = 4) Pageable pageable){
        return new DataResponse<>(200, "추천 상품 4개를 반환합니다.", productService.findRecommandProducts(pageable));
    }

    //제품 상세 보기
    @GetMapping("/{productId}")
    public DataResponse<?> getProduct(@PathVariable Long productId) {
        DataResponse<ProductResponseDto> response = new DataResponse<>(200, "상품 상세 정보를 반환합니다.");
        response.setData(productService.findProduct(productId));
        return response;
    }
}
