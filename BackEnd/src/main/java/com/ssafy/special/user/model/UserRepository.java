package com.ssafy.special.user.model;

import com.ssafy.special.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long userId);
    Optional<Member> findByLoginId(String loginId);
    Optional<Member> findByRefreshToken(String refreshToken);

}