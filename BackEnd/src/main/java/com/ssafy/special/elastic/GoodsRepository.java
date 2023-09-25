package com.ssafy.special.elastic;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodsRepository extends ElasticsearchRepository<Goods, String> {
    List<Goods> findByName(String name);
    // 추가 검색 메서드 정의 가능
}
