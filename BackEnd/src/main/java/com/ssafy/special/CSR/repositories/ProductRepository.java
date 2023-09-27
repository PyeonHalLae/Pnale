package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.enums.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    String defaultQuery = "SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId ";
    String filterQuery = "AND p.category in (:categories) " + "AND ep.CUType in (:eventTypes) ";

    @Query(defaultQuery)
    Page<Object[]> findAllProducts(Pageable pageable);

    @Query(defaultQuery +
            " WHERE p.recommand > 0 AND ( ep.CUType is not null OR ep.GSType is not null OR ep.SEVENType is not null OR ep.EMARTType is not null) " +
            "ORDER BY FUNCTION('RAND') ")
    List<Object[]> findRecommandProducts(Pageable pageable);

    //============ CU =============
    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND ep.CUType is not null ")
    Page<Object[]> findCUEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.CUType is not null")
    Page<Object[]> findCUBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.CUType is not null")
    Page<Object[]> findCUNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ GS =============
    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND ep.GSType is not null ")
    Page<Object[]> findGSEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.GSType is not null")
    Page<Object[]> findGSBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.GSType is not null")
    Page<Object[]> findGSNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ SEVEN =============
    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND ep.SEVENType is not null ")
    Page<Object[]> findSEVENEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.SEVENType is not null")
    Page<Object[]> findSEVENBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.SEVENType is not null")
    Page<Object[]> findSEVENNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    //============ EMART =============
    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND ep.EMARTType is not null ")
    Page<Object[]> findEMARTEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.EMARTType is not null")
    Page<Object[]> findEMARTBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            "WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.EMARTType is not null")
    Page<Object[]> findEMARTNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);


    @Query(defaultQuery +
            "WHERE p.pb = :corpType ")
    Page<Object[]> findPbProduct(Pageable pageable,
                                   @Param("corpType") CorpType corpType);

    //============ 상품 검색
    @Query(defaultQuery +
            "WHERE p.productId in ( :productId) ")
    Page<Object[]> findSearchProducts(Pageable pageable, @Param("productId") List<Long> productId);

    @Query("SELECT p FROM Product p " +
            "WHERE p.category = :category " +
            "ORDER BY p.productId ")
    Page<Product> findRelateProduct(Pageable pageable, @Param("category") ProductCategory category);

    //============ 필터 적용 검색 - 이름순
    @Query(defaultQuery +
            "WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuEventFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'CU' " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuPBFilterOrderName(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                       @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsEventFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsPBFilterOrderName(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                       @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenEventFilterOrderName(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenPBFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartEventFilterOrderName(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartPBFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);


    //============ 필터 적용 검색 - 가격 오름차순
    @Query(defaultQuery +
            "WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuEventFilterOrderPriceASC(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuPBFilterOrderPriceASC(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                           @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsEventFilterOrderPriceASC(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsPBFilterOrderPriceASC(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                           @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenEventFilterOrderPriceASC(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenPBFilterOrderPriceASC(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartEventFilterOrderPriceASC(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartPBFilterOrderPriceASC(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes")List<EventType> eventTypes);


    //============ 필터 적용 검색 - 가격 내림차순
    @Query(defaultQuery +
            "WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuEventFilterOrderPriceDESC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes")List<EventType> eventTypes);

    @Query( defaultQuery +
            "WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuPBFilterOrderPriceDESC(Pageable pageable,
                                           @Param("categories") List<ProductCategory> categories,
                                            @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsEventFilterOrderPriceDESC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsPBFilterOrderPriceDESC(Pageable pageable,
                                           @Param("categories") List<ProductCategory> categories,
                                            @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenEventFilterOrderPriceDESC(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenPBFilterOrderPriceDESC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartEventFilterOrderPriceDESC(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes")List<EventType> eventTypes);

    @Query(defaultQuery +
            "WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartPBFilterOrderPriceDESC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes")List<EventType> eventTypes);
}