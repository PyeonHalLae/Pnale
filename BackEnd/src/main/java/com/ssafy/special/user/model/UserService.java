package com.ssafy.special.user.model;

import com.ssafy.special.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


//    public User updateUserInMyPage(UserInfoDTO userInfoDTO){
//        User user = userRepository.findByUserId(userInfoDTO.getUserId()).orElseThrow(new RuntimeException("User not found"))
//
//        Optional<User> optionalUser = userRepository.findByUserId(id);
//        return optionalUser.orElse(null);
//
//    }

    public Member getLoginUserByLoginId(String loginId){
        if(loginId == null) return null;

        Optional<Member> optionalUser = userRepository.findByLoginId(loginId);
        return optionalUser.orElse(null);
    }
}
