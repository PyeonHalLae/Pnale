package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.CorpType;
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
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId ")
    Page<Object[]> findAllProducts(Pageable pageable);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.recommand > 0 AND ( ep.CUType is not null OR ep.GSType is not null OR ep.SEVENType is not null OR ep.EMARTType is not null)" +
            "ORDER BY FUNCTION('RAND') ")
    List<Object[]> findRecommandProducts(Pageable pageable);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.productId = :productId")
    Object[] findRecommandProduct(@Param("productId") Long productId);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) ")
    Page<Object[]> findCorpEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) " +
            "AND p.recommand > 0")
    Page<Object[]> findCorpBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) " +
            "AND p.isNew = true")
    Page<Object[]> findCorpNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

}