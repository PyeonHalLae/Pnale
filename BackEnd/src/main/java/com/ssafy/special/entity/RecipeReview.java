package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ReviewStatusType;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class RecipeReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long reviewId;

    @Column(nullable = false, columnDefinition = "varchar(200)")
    String content;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipeId;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    ReviewStatusType status;

}
