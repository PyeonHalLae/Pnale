package com.ssafy.special.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RecipeIngredient {
    @Id
    @GeneratedValue
    Long recipeIngredientId;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    Recipe recipe;
    @ManyToOne
    @JoinColumn(name = "product_id") // 재료 테이블과 연결하는 컬럼
    Product product;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean changeable;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean isDeleted;

    /**
     * CRUD와 관련된 엔티티 내부의 연산입니다.
     */

    // Delete
    public RecipeIngredient deleteIngredient(){
        this.isDeleted = true;
        return this;
    }

}