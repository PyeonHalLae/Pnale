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

}