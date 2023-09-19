package com.ssafy.special.eventproduct.model;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventProductService {
    private final EventProductRepository eventProductRepository;
}
