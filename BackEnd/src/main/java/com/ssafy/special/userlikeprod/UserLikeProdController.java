package com.ssafy.special.userlikeprod;

import com.ssafy.special.userlikeprod.model.UserLikeProdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;

@RestController
@RequestMapping("/api/likeprod")
@RequiredArgsConstructor
public class UserLikeProdController {
    private final UserLikeProdService userLikeProdService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserLikeProducts(@PathVariable Long userId, Pageable pageable){
        return ResponseEntity.ok(userLikeProdService.findAllLike(pageable, userId));
    }

    @GetMapping("/{productId}/{userId}")
    public ResponseEntity<?> likeProductToggle(@PathVariable Long productId,
                                               @PathVariable Long userId){

        return ResponseEntity.ok(userLikeProdService.likeToggle(productId, userId));
    }
}