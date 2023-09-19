package com.ssafy.special.entity;

import com.ssafy.special.enums.SocialType;
import com.ssafy.special.enums.RoleType;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long userId;

    @Column(nullable = false)
    String loginId;

    @Column
    String nickname;

    @Column
    @Lob
    String userImg;

    @Enumerated(EnumType.STRING)
    RoleType role;

    @Enumerated(EnumType.STRING)
    SocialType social;

    @Column(columnDefinition = "varchar(255)")
    String email;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable=false, updatable=false)
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",  insertable=false, updatable=true)
    LocalDateTime updatedAt;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean mailReceive;

    @Column
    String refreshToken;

    @OneToMany(mappedBy = "user")
    private Set<UserLikeProd> likeProducts = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<UserLikeRecipe> likeRecipes = new LinkedList<>();

    @OneToMany(mappedBy = "writer")
    private List<Recipe> writeRecipes = new LinkedList<>();

    public User updateUserInfo(String userImg, String nickname, LocalDateTime updatedAt, boolean mailReceive){
        this.userImg = userImg;
        this.nickname = nickname;
        this.updatedAt = updatedAt;
        this.mailReceive = mailReceive;
        return this;
    }
    public User updateRefreshToken(String refreshToken){
        this.refreshToken=refreshToken;
        return this;
    }

}
