package com.ssafy.special.CSR.repositories.vo;

import lombok.*;
import org.springframework.stereotype.Service;

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
