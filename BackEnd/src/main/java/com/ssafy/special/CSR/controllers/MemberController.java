package com.ssafy.special.CSR.controllers;



import com.ssafy.special.CSR.services.S3Service;
import com.ssafy.special.entity.Member;
import com.ssafy.special.enums.UploadType;
import com.ssafy.special.exception.*;
import com.ssafy.special.member.model.JwtService;
import com.ssafy.special.member.model.MemberRepository;
import com.ssafy.special.member.model.MemberService;
import com.ssafy.special.member.model.vo.MemberInfoDTO;
import com.ssafy.special.member.model.vo.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = {"/api/member", "/api/auth/member"})
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final JwtService jwtService;
    private final S3Service s3UploadService;

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public DataResponse<?> getUserInfo(HttpServletRequest request) {

        Long memberId = (Long)request.getAttribute("memberId");
        if(memberId == null) throw new AuthException(CustomErrorCode.FORBIDDEN);
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

    @RequestMapping("/needLogin")
    public void redirectLogin() {
        throw new AuthException(CustomErrorCode.FORBIDDEN);
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
    public CustomResponse updateUserInfo(@RequestPart("image") MultipartFile multipartFile, HttpServletRequest request, MemberUpdateDTO memberUpdateDTO) throws IOException {
        Long memberId = (Long)request.getAttribute("memberId");
        String imgUrl = s3UploadService.upload(UploadType.USERPROFILE, multipartFile);
        memberUpdateDTO.setMemberImg(imgUrl);
        memberService.updateMemberInMyPage(memberId, memberUpdateDTO);

        return new CustomResponse(200, "멤버 정보가 업데이트 되었습니다.");
    }


}