package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.RedisService;
import com.ssafy.special.exception.AuthException;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.elasticsearch.cluster.ClusterState;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = {"/api/mylist", "/api/auth/mylist"})
public class RedisController {

    private final RedisService redisService;

    @GetMapping("")
    public DataResponse<?> addKey(HttpServletRequest request) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) return new DataResponse<>(204, "로그인이 되어있지 않습니다.", null);

        List<String> searchList = redisService.getSearchList(memberId);

        if(searchList == null) return new DataResponse<>(200, "리스트가 없습니다.", new ArrayList<>());
        return new DataResponse<>(200, "사용자의 검색리스트를 출력합니다.", searchList);
    }

    @DeleteMapping("")
    public CustomResponse deleteKey(HttpServletRequest request) {
        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) return new CustomResponse(204, "로그인이 되어있지 않습니다.");

        redisService.deleteList(memberId);
        return new CustomResponse(200, "사용자의 검색리스트를 삭제합니다.");
    }


}
