package com.ssafy.special.userlikeprod;

import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.userlikeprod.model.UserLikeProdService;
import com.ssafy.special.userlikeprod.model.vo.UserLikeProdResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/likeprod")
@RequiredArgsConstructor
public class UserLikeProdController {
    private final UserLikeProdService userLikeProdService;

    @GetMapping("/{userId}")
    public DataResponse<?> getUserLikeProducts(@PathVariable Long userId, Pageable pageable){

        DataResponse<Page<UserLikeProdResponseDto>> response = new DataResponse<>(200, "유저가 찜한 상품 정보를 반환합니다.");
        response.setData(userLikeProdService.findAllLike(pageable, userId));
        return response;
    }

    @GetMapping("/like/{productId}/{userId}")
    public CustomResponse likeProductToggle(@PathVariable Long productId,
                                            @PathVariable Long userId){
        return new CustomResponse(200, userLikeProdService.likeToggle(productId, userId));
    }

    @GetMapping("/email-receive/{productId}/{userId}")
    public CustomResponse receiveEmailToggle(@PathVariable Long productId,
                                               @PathVariable Long userId){
        return new CustomResponse(200, userLikeProdService.receiveToggle(productId, userId));
    }
}
