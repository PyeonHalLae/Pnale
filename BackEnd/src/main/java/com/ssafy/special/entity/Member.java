package com.ssafy.special.entity;

import com.ssafy.special.enums.SocialType;
import com.ssafy.special.enums.RoleType;
import lombok.*;

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
@ToString
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

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private Set<MemberPickProd> likeProducts = new HashSet<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberPickRecipe> likeRecipes = new LinkedList<>();

    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    private List<Recipe> writeRecipes = new LinkedList<>();

    public Member updateMemberInfo(String memberImg, String nickname, boolean mailReceive){
        this.memberImg = memberImg;
        this.nickname = nickname;
        this.updatedAt = LocalDateTime.now();
        this.mailReceive = mailReceive;
        return this;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken=refreshToken;
    }

}
