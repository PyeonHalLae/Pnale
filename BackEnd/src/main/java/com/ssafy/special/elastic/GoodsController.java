package com.ssafy.special.elastic;

import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/search")
public class GoodsController {

    private final GoodsService goodsService;
    @PostMapping("")
    public DataResponse<?> searchByName(@PageableDefault(size = 20) Pageable pageable,
                                                  @RequestBody() Map<String, Object> map){
        String name = (String)map.get("name");
        log.info("{}", name);
        return new DataResponse(200, name + "에 대한 검색 리스트를 반환합니다.", goodsService.findSeachList(pageable, name));
        //return ResponseEntity.ok(GoodsService.findGoodsByName(pageable, name));
    }

    @PostMapping("/result")
    public DataResponse<?> searchByNameResult(@PageableDefault(size = 12) Pageable pageable,
                                        @RequestBody() Map<String, Object> map){
        String name = (String)map.get("name");
        log.info("{}", name);
        return new DataResponse(200, name + "에 대한 검색 결과를 반환합니다.", goodsService.findSearchResult(pageable, name));
    }
}