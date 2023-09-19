package com.ssafy.special.user.model.vo;

import com.ssafy.special.enums.SocialType;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class UserInfoDTO {
    private Long userId;
    private String nickname;
    private String socialType;
    private String email;
    private String userImg;
}
