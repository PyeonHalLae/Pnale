package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Product;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.EventType;
import com.ssafy.special.enums.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    String defaultQuery = "SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId ";
    String memberIdQeury = "SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep on p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId AND mpp.member.memberId = :memberId ";
    // 해당 쿼리는 (select * from member_pick_prod where member_id = 8) as `mpp` 를 사용하는게 성능향상이 있지만
    //JPQL에서 지원하지 않아서..

    @Query(defaultQuery)
    Page<Object[]> findAllProducts(Pageable pageable);

    @Query(memberIdQeury)
    Page<Object[]> findAllProductsByMemberId(Pageable pageable,
                                             @Param("memberId") Long memberId);

    @Query(defaultQuery +
            "  WHERE p.recommand > 0 AND ( ep.CUType is not null OR ep.GSType is not null OR ep.SEVENType is not null OR ep.EMARTType is not null) " +
            "ORDER BY FUNCTION('RAND') ")
    List<Object[]> findRecommandProducts(Pageable pageable);

    @Query(memberIdQeury +
            "  WHERE p.recommand > 0 AND ( ep.CUType is not null OR ep.GSType is not null OR ep.SEVENType is not null OR ep.EMARTType is not null) " +
            " ORDER BY FUNCTION('RAND') ")
    List<Object[]> findRecommandProductsByMemberId(PageRequest pageable,
                                                   @Param("memberId") Long memberId);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.hit = p.hit + 1 WHERE p.productId IN :productIds")
    int bulkUpdateProductHits(@Param("productIds") List<Long> productIds);

    //============ CU =============
    @Query(defaultQuery +
            "  WHERE p.pb in ( :all, :corp) AND ep.CUType is not null ")
    Page<Object[]> findCUEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.CUType is not null")
    Page<Object[]> findCUBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.CUType is not null")
    Page<Object[]> findCUNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);


    @Query(memberIdQeury +
            "  WHERE p.pb in ( :all, :corp) AND ep.CUType is not null ")
    Page<Object[]> findCUEventProductByMemberId(Pageable pageable,
                                                @Param("all") CorpType all,
                                                @Param("corp") CorpType corpType,
                                                @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.CUType is not null")
    Page<Object[]> findCUBestProductByMemberId(Pageable pageable,
                                               @Param("all") CorpType all,
                                               @Param("corp") CorpType corpType,
                                               @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.CUType is not null")
    Page<Object[]> findCUNewProductByMemberId(Pageable pageable,
                                              @Param("all") CorpType all,
                                              @Param("corp") CorpType corpType,
                                              @Param("memberId") Long memberId);


    //============ GS =============
    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND ep.GSType is not null ")
    Page<Object[]> findGSEventProduct(Pageable pageable,
                                      @Param("all") CorpType all,
                                      @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.GSType is not null")
    Page<Object[]> findGSBestProduct(Pageable pageable,
                                     @Param("all") CorpType all,
                                     @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.GSType is not null")
    Page<Object[]> findGSNewProduct(Pageable pageable,
                                    @Param("all") CorpType all,
                                    @Param("corp") CorpType corpType);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND ep.GSType is not null ")
    Page<Object[]> findGSEventProductByMemberId(Pageable pageable,
                                                @Param("all") CorpType all,
                                                @Param("corp") CorpType corpType,
                                                @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.GSType is not null")
    Page<Object[]> findGSBestProductByMemberId(Pageable pageable,
                                               @Param("all") CorpType all,
                                               @Param("corp") CorpType corpType,
                                               @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.GSType is not null")
    Page<Object[]> findGSNewProductByMemberId(Pageable pageable,
                                              @Param("all") CorpType all,
                                              @Param("corp") CorpType corpType,
                                              @Param("memberId") Long memberId);

    //============ SEVEN =============
    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND ep.SEVENType is not null ")
    Page<Object[]> findSEVENEventProduct(Pageable pageable,
                                         @Param("all") CorpType all,
                                         @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.SEVENType is not null")
    Page<Object[]> findSEVENBestProduct(Pageable pageable,
                                        @Param("all") CorpType all,
                                        @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.SEVENType is not null")
    Page<Object[]> findSEVENNewProduct(Pageable pageable,
                                       @Param("all") CorpType all,
                                       @Param("corp") CorpType corpType);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND ep.SEVENType is not null ")
    Page<Object[]> findSEVENEventProductByMemberId(Pageable pageable,
                                                   @Param("all") CorpType all,
                                                   @Param("corp") CorpType corpType,
                                                   @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.SEVENType is not null")
    Page<Object[]> findSEVENBestProductByMemberId(Pageable pageable,
                                                  @Param("all") CorpType all,
                                                  @Param("corp") CorpType corpType,
                                                  @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.SEVENType is not null")
    Page<Object[]> findSEVENNewProductByMemberId(Pageable pageable,
                                                 @Param("all") CorpType all,
                                                 @Param("corp") CorpType corpType,
                                                 @Param("memberId") Long memberId);

    //============ EMART =============
    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND ep.EMARTType is not null ")
    Page<Object[]> findEMARTEventProduct(Pageable pageable,
                                         @Param("all") CorpType all,
                                         @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.EMARTType is not null")
    Page<Object[]> findEMARTBestProduct(Pageable pageable,
                                        @Param("all") CorpType all,
                                        @Param("corp") CorpType corpType);

    @Query(defaultQuery +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.EMARTType is not null")
    Page<Object[]> findEMARTNewProduct(Pageable pageable,
                                       @Param("all") CorpType all,
                                       @Param("corp") CorpType corpType);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND ep.EMARTType is not null ")
    Page<Object[]> findEMARTEventProductByMemberId(Pageable pageable,
                                                   @Param("all") CorpType all,
                                                   @Param("corp") CorpType corpType,
                                                   @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.recommand > 0 AND ep.EMARTType is not null")
    Page<Object[]> findEMARTBestProductByMemberId(Pageable pageable,
                                                  @Param("all") CorpType all,
                                                  @Param("corp") CorpType corpType,
                                                  @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE p.pb in ( :all, :corp) AND p.isNew = true AND ep.EMARTType is not null")
    Page<Object[]> findEMARTNewProductByMemberId(Pageable pageable,
                                                 @Param("all") CorpType all,
                                                 @Param("corp") CorpType corpType,
                                                 @Param("memberId") Long memberId);


    @Query(defaultQuery +
            " WHERE p.pb = :corpType ")
    Page<Object[]> findPbProduct(Pageable pageable,
                                 @Param("corpType") CorpType corpType);

    @Query(memberIdQeury +
            " WHERE p.pb = :corpType ")
    Page<Object[]> findPbProductByMemberId(Pageable pageable,
                                           @Param("corpType") CorpType corpType,
                                           @Param("memberId") Long memberId);

    //============ 상품 검색
    @Query(defaultQuery +
            " WHERE p.productId in ( :productId) ")
    Page<Object[]> findSearchProducts(Pageable pageable, @Param("productId") List<Long> productId);

    @Query(memberIdQeury +
            " WHERE p.productId in ( :productId) ")
    Page<Object[]> findSearchProductsByMemberId(Pageable pageable,
                                                @Param("productId") List<Long> productId,
                                                @Param("memberId") Long memberId);

    @Query("SELECT p FROM Product p " +
            " WHERE p.category = :category " +
            "ORDER BY p.productId ")
    Page<Product> findRelateProduct(Pageable pageable, @Param("category") ProductCategory category);

    //============ 필터 적용 검색 - 이름순
    @Query(defaultQuery +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuEventFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'CU' " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuPBFilterOrderName(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                       @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsEventFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsPBFilterOrderName(Pageable pageable,
                                       @Param("categories") List<ProductCategory> categories,
                                       @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenEventFilterOrderName(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenPBFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartEventFilterOrderName(Pageable pageable,
                                             @Param("categories") List<ProductCategory> categories,
                                             @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartPBFilterOrderName(Pageable pageable,
                                          @Param("categories") List<ProductCategory> categories,
                                          @Param("eventTypes") List<EventType> eventTypes);


    //============ 필터 적용 검색 - 가격 오름차순
    @Query(defaultQuery +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuEventFilterOrderPriceASC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuPBFilterOrderPriceASC(Pageable pageable,
                                           @Param("categories") List<ProductCategory> categories,
                                           @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsEventFilterOrderPriceASC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsPBFilterOrderPriceASC(Pageable pageable,
                                           @Param("categories") List<ProductCategory> categories,
                                           @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenEventFilterOrderPriceASC(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenPBFilterOrderPriceASC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartEventFilterOrderPriceASC(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartPBFilterOrderPriceASC(Pageable pageable,
                                              @Param("categories") List<ProductCategory> categories,
                                              @Param("eventTypes") List<EventType> eventTypes);


    //============ 필터 적용 검색 - 가격 내림차순
    @Query(defaultQuery +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuEventFilterOrderPriceDESC(Pageable pageable,
                                               @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuPBFilterOrderPriceDESC(Pageable pageable,
                                            @Param("categories") List<ProductCategory> categories,
                                            @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsEventFilterOrderPriceDESC(Pageable pageable,
                                               @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsPBFilterOrderPriceDESC(Pageable pageable,
                                            @Param("categories") List<ProductCategory> categories,
                                            @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenEventFilterOrderPriceDESC(Pageable pageable,
                                                  @Param("categories") List<ProductCategory> categories,
                                                  @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenPBFilterOrderPriceDESC(Pageable pageable,
                                               @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartEventFilterOrderPriceDESC(Pageable pageable,
                                                  @Param("categories") List<ProductCategory> categories,
                                                  @Param("eventTypes") List<EventType> eventTypes);

    @Query(defaultQuery +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartPBFilterOrderPriceDESC(Pageable pageable,
                                               @Param("categories") List<ProductCategory> categories,
                                               @Param("eventTypes") List<EventType> eventTypes);


    //======= 상품 필터 - 아이디 포함 시작

    //============ 필터 적용 검색 - 이름순
    @Query(memberIdQeury +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuEventFilterOrderNameByMemberId(Pageable pageable,
                                                    @Param("categories") List<ProductCategory> categories,
                                                    @Param("eventTypes") List<EventType> eventTypes,
                                                    @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'CU' " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> cuPBFilterOrderNameByMemberId(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes") List<EventType> eventTypes,
                                                 @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsEventFilterOrderNameByMemberId(Pageable pageable,
                                                    @Param("categories") List<ProductCategory> categories,
                                                    @Param("eventTypes") List<EventType> eventTypes,
                                                    @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> gsPBFilterOrderNameByMemberId(Pageable pageable,
                                                 @Param("categories") List<ProductCategory> categories,
                                                 @Param("eventTypes") List<EventType> eventTypes,
                                                 @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenEventFilterOrderNameByMemberId(Pageable pageable,
                                                       @Param("categories") List<ProductCategory> categories,
                                                       @Param("eventTypes") List<EventType> eventTypes,
                                                       @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> sevenPBFilterOrderNameByMemberId(Pageable pageable,
                                                    @Param("categories") List<ProductCategory> categories,
                                                    @Param("eventTypes") List<EventType> eventTypes,
                                                    @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartEventFilterOrderNameByMemberId(Pageable pageable,
                                                       @Param("categories") List<ProductCategory> categories,
                                                       @Param("eventTypes") List<EventType> eventTypes,
                                                       @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.productName ")
    Page<Object[]> emartPBFilterOrderNameByMemberId(Pageable pageable,
                                                    @Param("categories") List<ProductCategory> categories,
                                                    @Param("eventTypes") List<EventType> eventTypes,
                                                    @Param("memberId") Long memberId);


    //============ 필터 적용 검색 - 가격 오름차순
    @Query(memberIdQeury +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuEventFilterOrderPriceASCByMemberId(Pageable pageable,
                                                        @Param("categories") List<ProductCategory> categories,
                                                        @Param("eventTypes") List<EventType> eventTypes,
                                                        @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> cuPBFilterOrderPriceASCByMemberId(Pageable pageable,
                                                     @Param("categories") List<ProductCategory> categories,
                                                     @Param("eventTypes") List<EventType> eventTypes,
                                                     @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsEventFilterOrderPriceASCByMemberId(Pageable pageable,
                                                        @Param("categories") List<ProductCategory> categories,
                                                        @Param("eventTypes") List<EventType> eventTypes,
                                                        @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> gsPBFilterOrderPriceASCByMemberId(Pageable pageable,
                                                     @Param("categories") List<ProductCategory> categories,
                                                     @Param("eventTypes") List<EventType> eventTypes,
                                                     @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenEventFilterOrderPriceASCByMemberId(Pageable pageable,
                                                           @Param("categories") List<ProductCategory> categories,
                                                           @Param("eventTypes") List<EventType> eventTypes,
                                                           @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> sevenPBFilterOrderPriceASCByMemberId(Pageable pageable,
                                                        @Param("categories") List<ProductCategory> categories,
                                                        @Param("eventTypes") List<EventType> eventTypes,
                                                        @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartEventFilterOrderPriceASCByMemberId(Pageable pageable,
                                                           @Param("categories") List<ProductCategory> categories,
                                                           @Param("eventTypes") List<EventType> eventTypes,
                                                           @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price ASC ")
    Page<Object[]> emartPBFilterOrderPriceASCByMemberId(Pageable pageable,
                                                        @Param("categories") List<ProductCategory> categories,
                                                        @Param("eventTypes") List<EventType> eventTypes,
                                                        @Param("memberId") Long memberId);


    //============ 필터 적용 검색 - 가격 내림차순
    @Query(memberIdQeury +
            " WHERE ep.CUType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.CUType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuEventFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                         @Param("categories") List<ProductCategory> categories,
                                                         @Param("eventTypes") List<EventType> eventTypes,
                                                         @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'CU'  " +
            "AND p.category in (:categories) " +
            "AND (ep.CUType in (:eventTypes) " +
            "OR ep.CUType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> cuPBFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                      @Param("categories") List<ProductCategory> categories,
                                                      @Param("eventTypes") List<EventType> eventTypes,
                                                      @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.GSType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.GSType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsEventFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                         @Param("categories") List<ProductCategory> categories,
                                                         @Param("eventTypes") List<EventType> eventTypes,
                                                         @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'GS'  " +
            "AND p.category in (:categories) " +
            "AND (ep.GSType in (:eventTypes) " +
            "OR ep.GSType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> gsPBFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                      @Param("categories") List<ProductCategory> categories,
                                                      @Param("eventTypes") List<EventType> eventTypes,
                                                      @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.SEVENType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.SEVENType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenEventFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                            @Param("categories") List<ProductCategory> categories,
                                                            @Param("eventTypes") List<EventType> eventTypes,
                                                            @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'SEVEN'  " +
            "AND p.category in (:categories) " +
            "AND (ep.SEVENType in (:eventTypes) " +
            "OR ep.SEVENType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> sevenPBFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                         @Param("categories") List<ProductCategory> categories,
                                                         @Param("eventTypes") List<EventType> eventTypes,
                                                         @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE ep.EMARTType is not null " +
            "AND p.category in (:categories) " +
            "AND ep.EMARTType in (:eventTypes) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartEventFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                            @Param("categories") List<ProductCategory> categories,
                                                            @Param("eventTypes") List<EventType> eventTypes,
                                                            @Param("memberId") Long memberId);

    @Query(memberIdQeury +
            " WHERE  p.pb = 'EMART'  " +
            "AND p.category in (:categories) " +
            "AND (ep.EMARTType in (:eventTypes) " +
            "OR ep.EMARTType is null) " +
            "ORDER BY p.price DESC ")
    Page<Object[]> emartPBFilterOrderPriceDESCByMemberId(Pageable pageable,
                                                         @Param("categories") List<ProductCategory> categories,
                                                         @Param("eventTypes") List<EventType> eventTypes,
                                                         @Param("memberId") Long memberId);
    //======= 상품 필터 - 아이디 미포함 끝
}