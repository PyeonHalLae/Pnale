package com.ssafy.special.product.model;

import com.ssafy.special.entity.Product;
import com.ssafy.special.product.model.vo.EventProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.recommand > 0 " +
            "ORDER BY FUNCTION('RAND') ")
    List<Object[]> findRecommandProducts(Pageable pageable);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.productId = :productId")
    Object[] findRecommandProduct(@Param("productId") Long productId);



}
//자기소개서를 정말 열과 성을 다해 작성했는데 다시 확인해보니 조사, 목적어 등 자잘한 부분에서 오타가 있더라구요.. 정말 가고 싶었던 기업인데 감점이 있을까요ㅠㅜ 너무 걱정이 됩니다..