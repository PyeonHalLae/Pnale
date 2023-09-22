package com.ssafy.special.member.model;


import com.ssafy.special.entity.Member;
import com.ssafy.special.member.model.vo.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    public Member updateMemberInMyPage(Long memberId, MemberUpdateDTO memberUpdateDTO){
        return memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("No user founded."))
                .updateMemberInfo(memberUpdateDTO.getMemberImg(), memberUpdateDTO.getNickname(), memberUpdateDTO.isEmailRecieve());
    }
}
