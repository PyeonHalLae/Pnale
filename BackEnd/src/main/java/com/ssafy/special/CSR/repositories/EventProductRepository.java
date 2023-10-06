package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventProductRepository extends JpaRepository<EventProduct, Long> {


}
