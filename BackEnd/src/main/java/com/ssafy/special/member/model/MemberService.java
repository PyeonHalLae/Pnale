package com.ssafy.special.member.model;


import com.ssafy.special.CSR.repositories.MemberPickProdRepository;
import com.ssafy.special.CSR.services.RedisService;
import com.ssafy.special.CSR.services.WebService;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.MemberPickProd;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.member.model.vo.MemberUpdateDTO;
import com.ssafy.special.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberPickProdRepository memberPickProdRepository;
    private final RedisService redisService;
    private final WebService webService;

    public Member updateMemberInMyPage(Long memberId, MemberUpdateDTO memberUpdateDTO){
        return memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("No user founded."))
                .updateMemberInfo(memberUpdateDTO.getMemberImg(), memberUpdateDTO.getNickname(), memberUpdateDTO.isEmailReceive());
    }

    public Map<String, Object> findMemberInfo(Long memberId) {
        Map<String, Object> response = new HashMap<>();

        response.put("member", memberRepository.findByMemberId(memberId)
                        .map(Member::toInfoDTO)
                                .orElseThrow(() -> new CustomException(CustomErrorCode.INVALID_MEMBER)));
        response.put("memberPick", ResponseUtil.getPageProducts(memberPickProdRepository.findByMember_MemberIdAndLikeStatTrue(memberId, Pageable.ofSize( 6))));
        return response;
    }

    public boolean signout(Long memberId){
        String token = redisService.getOauth2token(memberId);
        Member member = memberRepository.findByMemberId(memberId).orElseThrow();

        String url = member.getSocial().name();
        boolean isOauth = webService.revokeToken(url, token);
        if(isOauth){

            member.signout();
            memberRepository.save(member);
            return true;
        }
        else return false;
    }
}
