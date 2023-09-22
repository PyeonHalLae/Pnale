package com.ssafy.special.product.model;

import com.ssafy.special.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p  from Product p where p.hit > 0 order by FUNCTION('RAND') ")
    Page<Product> findRecommandProducts(Pageable pageable);
}
