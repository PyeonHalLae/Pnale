package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.product.ProductInfoDto;
import com.ssafy.special.CSR.dtos.recipe.RecipeListDTO;
import com.ssafy.special.CSR.dtos.search.ESListDto;
import com.ssafy.special.CSR.repositories.ElasticRepository;
import com.ssafy.special.CSR.repositories.MemberPickRecipeRepository;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.entity.Elastic;
import com.ssafy.special.entity.Product;
import com.ssafy.special.entity.Recipe;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ElasticService {
    private final ElasticRepository GoodsRepository;
    private final ProductRepository productRepository;
    private final RecipeRepository recipeRepository;
    private final MemberPickRecipeRepository memberPickRecipeRepository;

    public Elastic saveProduct(Elastic goods) {
        return GoodsRepository.save(goods);
    }

    public List<ESListDto> findSeachList(Pageable pageable, String name, Long memberId) {
        return GoodsRepository.findByName(pageable, name)
                .stream().map(Elastic::toDto).collect(Collectors.toList());
    }

    public List<ESListDto> findSearchRecipeList(Pageable pageable, String name, String category) {
        return GoodsRepository.findByNameAndCategory(pageable, name, category)
                .stream().map(Elastic::toDto).collect(Collectors.toList());
    }

    public List<ESListDto> findSearchRecipeCategoryList(Pageable pageable, String category) {
        return GoodsRepository.findByCategory(pageable, category)
                .stream().map(Elastic::toDto).collect(Collectors.toList());
    }

    public Map<String, Object> findIdsResult(Pageable pageable, List<Long> productIds, Long memberId) {
        Product p = productRepository.findById(productIds.get(0)).orElseThrow(() -> new CustomException(CustomErrorCode.PRODUCT_NOT_FOUND));

        log.info("{}", p.getCategory());

        Map<String, Object> response = new HashMap<>();
        response.put("search", findResultProducts(pageable, productIds, memberId));
        response.put("relate", findRelateProduct(pageable, p.getCategory()));
        response.put("recipes", findRelateRecipe(pageable, p.getProductId(), memberId));
        return response;
    }

    //관련 상품 반환
    public Page<Map<String, Object>> findResultProducts(Pageable pageable, List<Long> productIds, Long memberId) {

        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min(startIndex + pageSize, productIds.size());

        int updateResult = productRepository.bulkUpdateProductHits(productIds.subList(startIndex, endIndex));

        return memberId == null
                ? ResponseUtil.getPageProducts(productRepository.findSearchProducts(pageable, productIds))
                : ResponseUtil.getPageProducts(productRepository.findSearchProductsByMemberId(pageable, productIds, memberId));
    }

    //연관 상품 정보 반환
    public Page<ProductInfoDto> findRelateProduct(Pageable pageable, ProductCategory category) {
        return productRepository.findRelateProduct(pageable, category).map(Product::toInfoDto);

    }

    public Page<RecipeListDTO> findRelateRecipe(Pageable pageable, Long productId, Long memberId) {
        return recipeRepository.findRecipeByProductId(pageable, productId).map(data -> {
            boolean like = memberPickRecipeRepository.findIsDeletedByMemberAndRecipe(memberId, data.getRecipeId())
                    .map(isDeleted -> !isDeleted).orElse(false);
            boolean myRecipe = data.getWriter().getMemberId().equals(memberId);
            return data.toListDto(like, myRecipe);
        });
    }
}
