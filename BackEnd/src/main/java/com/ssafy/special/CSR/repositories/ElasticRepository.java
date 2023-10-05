package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.Elastic;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElasticRepository extends ElasticsearchRepository<Elastic, String> {
    List<Elastic> findByName(Pageable pageable, String name);
    // 추가 검색 메서드 정의 가능
    List<Elastic> findByNameAndCategory(Pageable pageable, String name, String category);

    List<Elastic> findByCategory(Pageable pageable, String category);
}
