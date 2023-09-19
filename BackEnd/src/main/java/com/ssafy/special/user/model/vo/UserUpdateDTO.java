package com.ssafy.special.user.model.vo;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class UserUpdateDTO {
    private Long userId;
    private String nickname;
    private boolean emailRecieve;
    private String userImg;
}
