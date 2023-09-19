package com.ssafy.special.eventproduct.model;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventProductRepository extends JpaRepository<EventProduct, Long> {
    Optional<EventProduct> findEventProductByProduct_ProductId(Long productId);

    Optional<EventProduct> findEventProductByProduct(Product product);
}
