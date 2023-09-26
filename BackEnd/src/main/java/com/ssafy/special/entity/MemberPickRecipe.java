package com.ssafy.special.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class MemberPickRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long pickRecipeId;

    @ManyToOne
    @JoinColumn(name="member_id")
    Member member;

    @ManyToOne
    @JoinColumn(name="recipe_id")
    Recipe recipe;

    @Column(columnDefinition = "tinyint(1) default 0")
    boolean isDeleted;
}
