package com.ssafy.special.CSR.dtos.recipe;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeMainPageDTO {
    private RecipeRecommendDTO best;
    private Page<RecipeListDTO> recipes;
}