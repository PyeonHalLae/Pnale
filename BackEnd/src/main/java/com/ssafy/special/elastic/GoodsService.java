package com.ssafy.special.elastic;

import com.ssafy.special.CSR.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoodsService {
    private final GoodsRepository GoodsRepository;
    private final ProductRepository productRepository;

    public Goods saveProduct(Goods goods) {
        return GoodsRepository.save(goods);
    }

    public List<ESResultDto> findSeachList(Pageable pageable, String name) {
        return GoodsRepository.findByName(pageable, name)
                .stream().map(Goods::toDto).collect(Collectors.toList());
    }

    public Map<String, Object> findNameResult(Pageable pageable, String name) {
        Map<String, Object> response = new HashMap<>();
        //response.put("search", ResponseUtil.getPageProducts(productRepository.));
        response.put("relate", null);
        response.put("recipes", null);
        return response;
    }

    public Object findResultProduct(Pageable pageable, String name) {
        return null;
    }

    public Object findRelateProduct(Pageable pageable, String name) {
        return null;
    }

    public Object findRelateRecipe(Pageable pageable, String name) {
        return null;
    }
}
