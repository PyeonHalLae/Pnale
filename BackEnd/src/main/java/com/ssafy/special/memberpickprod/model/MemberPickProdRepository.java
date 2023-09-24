package com.ssafy.special.memberpickprod.model;

import com.ssafy.special.entity.MemberPickProd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberPickProdRepository extends JpaRepository<MemberPickProd, Long> {
    Optional<MemberPickProd> findByMember_MemberIdAndProduct_ProductId(Long userId, Long productId);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE mpp.member.memberId = :memberId AND mpp.likeStat = true")
    Page<Object[]> findByMember_MemberIdAndLikeStatTrue(@Param("memberId")Long memberId, Pageable pageable);
}
