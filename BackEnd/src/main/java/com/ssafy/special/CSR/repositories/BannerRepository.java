package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Banner;
import com.ssafy.special.enums.CorpType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query("SELECT b FROM Banner b " +
            "WHERE b.startDate <= :today AND b.endDate >= :today AND b.corpType = :corpType " +
            "ORDER BY b.startDate DESC ")
    List<Banner> findVaildBanner(Pageable pageable,
                                 @Param("today") LocalDate today,
                                 @Param("corpType")CorpType corpType);
}
