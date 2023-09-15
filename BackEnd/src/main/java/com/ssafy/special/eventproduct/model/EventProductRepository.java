package com.ssafy.special.eventproduct.model;

import com.ssafy.special.entity.EventProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventProductRepository extends JpaRepository<EventProduct, Long> {
}
