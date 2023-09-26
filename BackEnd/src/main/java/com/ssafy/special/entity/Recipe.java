package com.ssafy.special.entity;


import com.ssafy.special.CSR.repositories.vo.RecipeListDTO;
import lombok.Getter;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long recipe;

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

    @Column(columnDefinition = "bigint default 0")
    Long viewCnt;

    @Column(columnDefinition = "bigint default 0")
    Long replyCnt;

    @Column(columnDefinition = "bigint default 0")
    Long likes;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean isDeleted;

    @Lob
    String recipeVideoUrl;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    boolean influence;


    public RecipeListDTO toListDto(boolean like){
        return RecipeListDTO.builder()
                .rcpId(this.recipe)
                .rcpName(this.recipeName)
                .member(this.writer.toViewDTO())
                .createdAt(this.createdAt)
                .replyCnt(this.replyCnt)
                .likeCnt(this.likes)
                .viewCnt(this.viewCnt)
                .influence(this.influence)
                .like(like)
                .build();
    }


}
