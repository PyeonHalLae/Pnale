package com.ssafy.special.CSR.dtos.recipe;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeMainPageDTO {
    private RecipeRecommendDTO best;
    private List<RecipeListDTO> recipes;
}