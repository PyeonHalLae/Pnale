package com.ssafy.special.memberpickprod;

import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.memberpickprod.model.MemberPickProdService;
import com.ssafy.special.memberpickprod.model.vo.UserPickProdResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value ={"/api/pick_prod", "api/auth/pick_prod"} )
@RequiredArgsConstructor
public class MemberPickProdController {
    private final MemberPickProdService memberPickProdService;

    @GetMapping("/{memberId}")
    public DataResponse<?> getUserPickProducts(@PathVariable Long memberId, Pageable pageable){

        DataResponse<Page<UserPickProdResponseDto>> response = new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.");
        response.setData(memberPickProdService.findAllPick(pageable, memberId));
        return response;
    }

    @GetMapping("/pick/{productId}/{userId}")
    public CustomResponse pickProductToggle(@PathVariable Long productId,
                                            @PathVariable Long userId){
        return new CustomResponse(200, memberPickProdService.pickToggle(productId, userId));
    }

    @GetMapping("/email-receive/{productId}/{userId}")
    public CustomResponse receiveEmailToggle(@PathVariable Long productId,
                                               @PathVariable Long userId){
        return new CustomResponse(200, memberPickProdService.receiveToggle(productId, userId));
    }
}
