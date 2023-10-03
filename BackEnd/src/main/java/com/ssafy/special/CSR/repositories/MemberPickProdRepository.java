package com.ssafy.special.CSR.repositories;

import com.ssafy.special.CSR.dtos.email.EmailProductDto;
import com.ssafy.special.entity.MemberPickProd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberPickProdRepository extends JpaRepository<MemberPickProd, Long> {
    Optional<MemberPickProd> findByMember_MemberIdAndProduct_ProductId(Long userId, Long productId);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE mpp.member.memberId = :memberId AND mpp.likeStat = true " +
            "ORDER BY FUNCTION('RAND')" )
    Page<Object[]> findByMember_MemberIdAndLikeStatTrue(@Param("memberId")Long memberId, Pageable pageable);

//    SELECT p.productId, p.productImg, p.productName, ep.SEVENType, ep.GSType, ep.EMARTType, ep.CUType, mpp.likeStat, mpp.isReceived
    @Query("SELECT new com.ssafy.special.CSR.dtos.email.EmailProductDto(p.productId, p.productImg, p.productName, ep.SEVENType, ep.GSType, ep.EMARTType, ep.CUType, mpp.likeStat, mpp.isReceived) " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE mpp.member.memberId = :memberId AND mpp.likeStat = true AND mpp.isReceived = true " +
            " AND( ep.CUType IS NOT NULL OR ep.GSType IS NOT NULL OR ep.SEVENType IS NOT NULL OR ep.EMARTType IS NOT NULL ) " +
            "ORDER BY FUNCTION('RAND')" )
    Optional<Page<EmailProductDto>> findByMember_MemberIdAndLikeStatTrueAndReceivedTrue(Pageable pageable, @Param("memberId")Long memberId);
}
