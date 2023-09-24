package com.ssafy.special.member.model;

import com.ssafy.special.entity.Member;
import com.ssafy.special.enums.RoleType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long memberId);
    Optional<Member> findByLoginIdAndRole(String LoginId, RoleType role);
    Optional<Member> findByRefreshToken(String refreshToken);

    @Query("SELECT p, ep, mpp " +
            "FROM Product p " +
            "LEFT JOIN FETCH EventProduct ep ON p.productId = ep.product.productId " +
            "LEFT JOIN FETCH MemberPickProd mpp ON p.productId = mpp.product.productId " +
            "WHERE mpp.member.memberId = :memberId AND mpp.likeStat = true")
    Page<Object[]> findByMember_MemberIdAndLikeStatTrue(@Param("memberId")Long memberId, Pageable pageable);


}