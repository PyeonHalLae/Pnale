package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ProductCategory;
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

    //============ CU =============
    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND ep.CUType is not null ")
    Page<Object[]> findCUEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.CUType is not null")
    Page<Object[]> findCUBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.CUType is not null")
    Page<Object[]> findCUNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ GS =============
    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND ep.GSType is not null ")
    Page<Object[]> findGSEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.GSType is not null")
    Page<Object[]> findGSBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.GSType is not null")
    Page<Object[]> findGSNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ SEVEN =============
    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND ep.SEVENType is not null ")
    Page<Object[]> findSEVENEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.SEVENType is not null")
    Page<Object[]> findSEVENBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.SEVENType is not null")
    Page<Object[]> findSEVENNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ EMART =============
    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND ep.EMARTType is not null ")
    Page<Object[]> findEMARTEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.EMARTType is not null")
    Page<Object[]> findEMARTBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query("SELECT p, ep, mpp FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.EMARTType is not null")
    Page<Object[]> findEMARTNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ 상품 검색
    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE p.productId in ( :productId) ")
    Page<Object[]> findSearchProducts(Pageable pageable, @Param("productId") List<Long> productId);

    @Query("SELECT p FROM Product p " +
            "WHERE p.category = :category ")
    Page<Object[]> findRelateProduct(Pageable pageable, @Param("category") ProductCategory category);
}