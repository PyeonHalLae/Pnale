package com.ssafy.special.memberpickprod.model;

import com.ssafy.special.entity.MemberPickProd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberPickProdRepository extends JpaRepository<MemberPickProd, Long> {
    Optional<MemberPickProd> findByMember_MemberIdAndProduct_ProductId(Long userId, Long productId);

    Page<MemberPickProd> findByMember_MemberIdAndLikeStatTrue(Long userId, Pageable pageable);
}
