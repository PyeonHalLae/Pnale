package com.ssafy.special.CSR.controllers;



import com.ssafy.special.entity.Member;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomResponse;
import com.ssafy.special.exception.DataResponse;
import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.MemberRepository;
import com.ssafy.special.member.model.MemberService;
import com.ssafy.special.member.model.vo.MemberInfoDTO;
import com.ssafy.special.member.model.vo.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = {"/api/member", "/api/auth/member"})
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final JwtService jwtService;

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> getUserInfo(HttpServletRequest request) {

        Long memberId = (Long)request.getAttribute("memberId");
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new RuntimeException("Member not found"));

        MemberInfoDTO memberInfo = MemberInfoDTO.builder()
                .memberId(memberId)
                .nickname(member.getNickname())
                .memberImg(member.getMemberImg())
                .email(member.getEmail())
                .socialType(member.getSocial())
                .mailReceive(member.isMailReceive())
                .build();

        return new DataResponse<MemberInfoDTO>(200, "유저 정보를 출력합니다.", memberInfo);
        //return new DataResponse<MemberInfoDTO>(200, "유저 정보를 출력합니다.", memberRepository.findByMemberId(memberId).map(Member::toInfoDTO).orElseThrow(() -> new RuntimeException("Member not found")););
    }

    @PostMapping("/logout")
    public CustomResponse logout(HttpServletRequest request, HttpServletResponse response) {
        Long memberId = (Long)request.getAttribute("memberId");

        jwtService.sendDeletedToken(memberId, response);

        return new CustomResponse(200, "logout");

    }

    @GetMapping("/needLogin")
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void redirectLogin() {

    }

    @GetMapping("/memberTest")
    public CustomResponse memberNotLoginTest(HttpServletRequest req)  {
        Long memberId = (Long) req.getAttribute("memberId");
        System.out.println(memberId);

        if (memberId != null) {
            return new CustomResponse(200, memberId+"유저가 로그인");
        }

        return new CustomResponse(200, "비로그인");
    }

    @PatchMapping("/update")
    public CustomResponse updateUserInfo(HttpServletRequest request, MemberUpdateDTO memberUpdateDTO) {
        String token = jwtService.getAccessToken(request).orElseThrow(()-> new CustomException(CustomErrorCode.TOKEN_UNDEFINED_ERROR));
        Long memberId = jwtService.getMemberId(token).orElseThrow(() -> new CustomException(CustomErrorCode.TOKEN_UNDEFINED_ERROR));

        memberService.updateMemberInMyPage(memberId, memberUpdateDTO);

        return new CustomResponse(200, "멤버 정보가 업데이트 되었습니다.");
    }


}