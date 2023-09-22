package com.ssafy.special.elastic;

import com.ssafy.special.entity.Product;
import com.ssafy.special.product.model.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoodsService {

    private final GoodsRepository GoodsRepository;

    public Goods saveProduct(Goods goods) {
        return GoodsRepository.save(goods);
    }

    public List<Goods> findGoodsByName(String name) {
        return GoodsRepository.findByName(name);
    }
}
