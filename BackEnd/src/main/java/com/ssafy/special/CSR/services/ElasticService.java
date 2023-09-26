package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.search.ESResultDto;
import com.ssafy.special.CSR.repositories.ElasticRepository;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.CSR.repositories.RecipeRepository;
import com.ssafy.special.entity.Elastic;
import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.ProductCategory;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ElasticService {
    private final ElasticRepository GoodsRepository;
    private final ProductRepository productRepository;
    private final RecipeRepository recipeRepository;

    public Elastic saveProduct(Elastic goods) {
        return GoodsRepository.save(goods);
    }

    public List<ESResultDto> findSeachList(Pageable pageable, String name) {
        return GoodsRepository.findByName(pageable, name)
                .stream().map(Elastic::toDto).collect(Collectors.toList());
    }

    public Map<String, Object> findNameResult(Pageable pageable, List<Long> productIds) {
        Product p = productRepository.findById(productIds.get(0)).orElseThrow(() -> new CustomException(CustomErrorCode.PRODUCT_NOT_FOUND));

        Map<String, Object> response = new HashMap<>();
        response.put("search", findResultProducts(Pageable.ofSize(4), productIds));
        response.put("relate", findRelateProduct(pageable, p.getCategory()));
        response.put("recipes", recipeRepository.findTop3ByOrderByCreatedAtDesc(pageable));
        return response;
    }

    public Page<Map<String, Object>> findResultProducts(Pageable pageable, List<Long> productIds) {
        return ResponseUtil.getPageProducts(productRepository.findSearchProducts(pageable, productIds));
    }

    public Page<Map<String, Object>> findRelateProduct(Pageable pageable, ProductCategory category) {
        return ResponseUtil.getPageProducts(productRepository.findRelateProduct(pageable, category));
    }

    public Page<Map<String, Object>> findRelateRecipe(Pageable pageable, String name) {
        //return ResponseUtil.getPageProducts(recipeRepository.findRelateProduct(pageable, name));
        return null;
    }
}
