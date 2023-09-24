package com.ssafy.special.product.model;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import com.ssafy.special.product.model.vo.EventProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventProductRepository extends JpaRepository<EventProduct, Long> {
    Optional<EventProduct> findEventProductByProduct_ProductId(Long productId);

    Optional<EventProduct> findEventProductByProduct(Product product);

}
