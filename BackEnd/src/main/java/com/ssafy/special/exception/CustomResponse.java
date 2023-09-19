package com.ssafy.special.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class CustomResponse {
    private int code;
    private String message;

    public CustomResponse(int code, String message ) {
        this.code = code;
        this.message = message;
    }
}
