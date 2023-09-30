package com.ssafy.special.util;

import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Component
@Slf4j
public class RequestUtil {

    static Long getMemberId(HttpServletRequest request){
        Long memberId = (Long) request.getAttribute("memebeId");
        if(memberId == null) throw new CustomException(CustomErrorCode.INVALID_REQUEST_DATA);
        return memberId;
    }
}
