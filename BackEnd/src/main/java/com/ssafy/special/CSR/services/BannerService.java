package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.dtos.banner.BannerDto;
import com.ssafy.special.CSR.repositories.BannerRepository;
import com.ssafy.special.entity.Banner;
import com.ssafy.special.enums.CorpType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;

    public List<BannerDto> findCorpBanner(Pageable pageable, CorpType corpType) {
        return bannerRepository.findVaildBanner(LocalDate.now())
                .stream()
                .map(Banner::toDto)
                .collect(Collectors.toList());
    }
}
