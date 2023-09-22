package com.ssafy.special.elastic;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GoodsController {

    private final GoodsService GoodsService;
    @PostMapping("/search")
    public ResponseEntity<List<Goods>> searchByName(@RequestBody Map<String, Object> map){
        String name = (String)map.get("name");
        System.out.println(name);
        Integer tem = GoodsService.findGoodsByName(name).size();
        if (tem >= 30) {
            return ResponseEntity.ok(GoodsService.findGoodsByName(name).subList(0, 30));
        }
        return ResponseEntity.ok(GoodsService.findGoodsByName(name).subList(0,tem));
    }
}