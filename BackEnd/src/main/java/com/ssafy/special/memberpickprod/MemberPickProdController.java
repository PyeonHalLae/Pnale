package com.ssafy.special.memberpickprod;

import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.memberpickprod.model.MemberPickProdService;
import com.ssafy.special.memberpickprod.model.vo.MemberPickProdInfoDto;
import com.ssafy.special.memberpickprod.model.vo.MemberPickToggleDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping(value ={"/api/pick_prod", "/api/auth/pick_prod"} )
@RequiredArgsConstructor
@Slf4j
public class MemberPickProdController {
    private final MemberPickProdService memberPickProdService;

    @GetMapping("/pick/{memberId}")
    public DataResponse<?> getUserPickProducts(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){
        DataResponse<Page<Map<String,Object>>> response = new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.");
        response.setData(memberPickProdService.findAllPick(pageable, memberId));
        return response;
    }

    @PostMapping("/pick")
    public CustomResponse pickProductToggle(@RequestBody Map<String, Long> requestData){
        log.info("{}", requestData);
        return new CustomResponse(200, memberPickProdService.pickToggle(requestData.get("productId"), requestData.get("memberId")));
    }

//    @GetMapping("/pick/{memberId}")
//    public DataResponse<?> getUserPickProducts(@PathVariable Long memberId, @PageableDefault(size = 9) Pageable pageable){
//        DataResponse<Page<Map<String,Object>>> response = new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.");
//        response.setData(memberPickProdService.findAllPick(pageable, memberId));
//        return response;
//    }

    @PostMapping("/receive")
    public CustomResponse receiveEmailToggle(@RequestBody Map<String, Long> requestData){
        return new CustomResponse(200, memberPickProdService.receiveToggle(requestData.get("productId"), requestData.get("memberId")));
    }
}
