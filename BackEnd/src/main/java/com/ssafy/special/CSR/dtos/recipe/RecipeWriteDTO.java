package com.ssafy.special.CSR.dtos.recipe;

import com.ssafy.special.entity.RecipeIngredient;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeWriteDTO {
    private String rcpName;
    private List<Ingredients> ingredients;
    private String rcpThumbnail;
    private String rcpSimple;
    private String rcpDesc;
    private String rcpVideo;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Ingredients {
        private Long prdId;
        private Boolean changeable;
    }
}