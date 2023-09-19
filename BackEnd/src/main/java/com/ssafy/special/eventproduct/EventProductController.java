package com.ssafy.special.eventproduct;

import com.ssafy.special.eventproduct.model.EventProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/event_product")
@RequiredArgsConstructor
public class EventProductController {
    private final EventProductService eventProductService;
}
