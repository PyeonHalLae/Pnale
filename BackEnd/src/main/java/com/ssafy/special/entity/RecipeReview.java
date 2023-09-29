package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import com.ssafy.special.enums.ReviewStatusType;
import lombok.*;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long reviewId;

    @Column(nullable = false, columnDefinition = "varchar(200)")
    String content;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    ReviewStatusType status;

    public void updateReview(String content){
        this.content = content;
        this.updatedAt = LocalDateTime.now();

    }

    public void deleteReview(){
        this.updatedAt = LocalDateTime.now();
        this.status = ReviewStatusType.DELETED;

    }
}
