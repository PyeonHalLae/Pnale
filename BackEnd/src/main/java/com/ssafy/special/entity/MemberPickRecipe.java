package com.ssafy.special.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    public void toggleLike(){
        this.isDeleted = !this.isDeleted;
    }
}
