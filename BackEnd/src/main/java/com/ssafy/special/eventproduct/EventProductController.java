package com.ssafy.special.eventproduct;

import com.ssafy.special.eventproduct.model.EventProductService;
import com.ssafy.special.eventproduct.model.vo.EventProductDto;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/event_product")
@RequiredArgsConstructor
public class EventProductController {
    private final EventProductService eventProductService;

    @GetMapping("")
    public DataResponse<?> getAllEventProducts(@PageableDefault(size = 12) Pageable pageable){
        DataResponse<Page<EventProductDto>> response = new DataResponse<>(200, pageable.getPageNumber() + " 페이지 상품 정보를 반환합니다.");
        //if(유저 로그인 했을 떄){}
        //else if(유저 로그인 안했을 떄 ){}
        response.setData(eventProductService.findAllEventProducts(pageable));
        return response;
    }
}
