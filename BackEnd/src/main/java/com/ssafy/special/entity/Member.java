package com.ssafy.special.entity;

import com.ssafy.special.enums.SocialType;
import com.ssafy.special.enums.RoleType;
import com.ssafy.special.member.model.vo.MemberInfoDTO;
import com.ssafy.special.member.model.vo.MemberViewDTO;
import lombok.*;
import org.elasticsearch.monitor.os.OsStats;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long memberId;

    @Column(nullable = false)
    String loginId;

    @Column
    String nickname;

    @Column(name="member_img")
    @Lob
    String memberImg;

    @Enumerated(EnumType.STRING)
    RoleType role;

    @Enumerated(EnumType.STRING)
    SocialType social;

    @Column(columnDefinition = "varchar(255)")
    String email;

    @Column(columnDefinition = "tinyint(1) default 0")
    boolean mailReceive;

    @Column
    String refreshToken;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable=false, updatable=false)
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",  insertable=false, updatable=true)
    LocalDateTime updatedAt;

    public MemberViewDTO toViewDTO(){
        return MemberViewDTO.builder()
                .memberId(this.memberId)
                .nickname(this.nickname)
                .memberImg(this.memberImg)
                .build();
    }

    public MemberInfoDTO toInfoDTO(){
        return MemberInfoDTO.builder()
                .memberId(this.memberId)
                .nickname(this.nickname)
                .socialType(this.social)
                .email(this.email)
                .memberImg(this.memberImg)
                .mailReceive(this.mailReceive)
                .build();
    }
    public Member updateMemberInfo(String memberImg, String nickname, boolean mailReceive){
        this.memberImg = memberImg==null?this.memberImg:memberImg;
        this.nickname = nickname;
        this.updatedAt = LocalDateTime.now();
        this.mailReceive = mailReceive;
        return this;
    }

    public void signout(){
        this.role=RoleType.DELETED;
    }
    public void updateRefreshToken(String refreshToken){
        this.refreshToken=refreshToken;
    }

}
