package com.ssafy.special.CSR.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecipeService {
    public Page<Map<String, Object>> findAllPick(Pageable pageable, Long memberId) {
        return null;
    }
}
