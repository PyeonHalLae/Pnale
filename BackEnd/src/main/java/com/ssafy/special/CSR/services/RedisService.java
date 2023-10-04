package com.ssafy.special.CSR.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.special.CSR.dtos.search.RedisSearchDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void setSearchList(Long memberId, String keyword){
        long currentTime = System.currentTimeMillis();
        ListOperations<String, String> lop = redisTemplate.opsForList();
        try {
            RedisSearchDTO data = RedisSearchDTO.builder()
                    .memberId(memberId)
                    .keyword(keyword)
                    .time(currentTime)
                    .build();
            String jsonData = new ObjectMapper().writeValueAsString(data);
            lop.rightPush("search", jsonData);
        } catch(JsonProcessingException e) {
            System.out.println("JSON화에 실패했습니다.");
        }finally {
            ZSetOperations<String, String> zop = redisTemplate.opsForZSet();
            zop.add(memberId + "search", keyword, currentTime);
        }
    }

    public void deleteList(Long memberId){
        redisTemplate.delete(memberId+"search");
    }

    public List<String> getSearchList(Long memberId){
        ZSetOperations<String, String> zop = redisTemplate.opsForZSet();

        // 20개 까지만 출력
        Set<String> sortedSet = zop.reverseRange(memberId+"search", 0, 19);
        // 나머지는 이틈에 삭제
        zop.removeRange(memberId+"search", 0, -21);

        if(sortedSet == null || sortedSet.isEmpty()) return null;
        return new ArrayList<>(sortedSet);
    }
}
