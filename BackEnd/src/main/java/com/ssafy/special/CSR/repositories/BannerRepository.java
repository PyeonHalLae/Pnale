package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query("SELECT b FROM Banner b WHERE b.startDate <= :today AND b.endDate >= :today")
    List<Banner> findVaildBanner(@Param("today")LocalDate today);
}
