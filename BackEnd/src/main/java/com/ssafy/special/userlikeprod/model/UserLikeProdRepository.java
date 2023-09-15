package com.ssafy.special.userlikeprod.model;

import com.ssafy.special.entity.UserLikeProd;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.Optional;

@Repository
public interface UserLikeProdRepository extends JpaRepository<UserLikeProd, Long> {
    Optional<UserLikeProd> findByUser_UserIdAndProduct_ProductId(Long userId, Long productId);

    Page<UserLikeProd> findByUser_UserIdAndLikeStatTrue(Long userId, Pageable pageable);
}
