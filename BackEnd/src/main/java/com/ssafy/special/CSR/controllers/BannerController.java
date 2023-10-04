package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.BannerService;
import com.ssafy.special.enums.CorpType;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/banner")
@RequiredArgsConstructor
public class BannerController {
    private final BannerService bannerService;
    @GetMapping("/{corpType}")
    public DataResponse<?> getCorpBanner(Pageable pageable,
                                         @PathVariable CorpType corpType){
        return new DataResponse<>(200, corpType + "에 해당되는 배너들을 출력합니다.", bannerService.findCorpBanner(pageable, corpType));
    }
}
