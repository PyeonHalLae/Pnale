package com.ssafy.special.entity;


import com.ssafy.special.CSR.dtos.recipe.RecipeListDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

// 어째서 setter이 없어졌었을까?
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long recipeId;

    @ManyToOne
    @JoinColumn(name="writer_id")
    Member writer;
    @Column(nullable = false)
    String recipeName;
    @Column(nullable = false)
    String recipeSimple;
    @Lob
    @Column(nullable = false)
    String recipeDesc;

    @Lob
    @Column(nullable = false)
    String recipeThumbnail;

    @Lob
    @Column(nullable = false)
    String recipeVideoUrl;

    @Column(columnDefinition = "default 0")
    Long viewCnt;

    @Column(columnDefinition = "default 0")
    Long replyCnt;

    @Column(columnDefinition = "default 0")
    Long likeCnt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean isDeleted;

    boolean influence;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<RecipeIngredient> ingredients = new LinkedList<>();

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<RecipeReview> reviews = new LinkedList<>();

    public void addReview(RecipeReview review) {
        reviews.add(review);
        review.setRecipe(this);
    }

    public void likeChange(boolean like) {
        if(like) this.likeCnt = this.likeCnt+1;
        else this.likeCnt = this.likeCnt-1;
    }


    /**
     * CRUD와 관련된 엔티티 내부의 연산입니다.
     */

    // Update
    public void updateRecipe(String rcpName, String rcpThumb, String rcpSimp, String rcpDesc, String rcpVideo, List<RecipeIngredient> ingres){
        this.recipeName = rcpName;
        this.recipeThumbnail = rcpThumb;
        this.recipeSimple = rcpSimp;
        this.recipeDesc = rcpDesc;
        this.recipeVideoUrl = rcpVideo;
        this.ingredients = ingres;
        this.updatedAt = LocalDateTime.now();
    }

    // Delete
    public void deleteRecipe(List<RecipeIngredient> lists){
        this.updatedAt = LocalDateTime.now();
        this.ingredients = lists;
        this.isDeleted = true;
    }


    //DTO로 변화시키는 엔티티 내부의 연산입니다.
    public RecipeListDTO toListDto(boolean like, boolean myRecipe){
        return RecipeListDTO.builder()
                .rcpId(this.recipeId)
                .rcpName(this.recipeName)
                .rcpThumbnail(this.recipeThumbnail)
                .rcpSimple(this.recipeSimple)
                .member(this.writer.toViewDTO())
                .createdAt(this.createdAt)
                .replyCnt(this.replyCnt)
                .likeCnt(this.likeCnt)
                .viewCnt(this.viewCnt)
                .influence(this.influence)
                .like(like)
                .myRecipe(myRecipe)
                .build();
    }
}