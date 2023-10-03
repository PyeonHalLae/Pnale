package com.ssafy.special.CSR.dtos.email;

import com.ssafy.special.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class EmailProductDto {

    private Long productId;
    private String productImg;
    private String productName;
    private String SEVENType;
    private String GSType;
    private String EMARTType;
    private String CUType;
    private Boolean likeStat;
    private Boolean isReceived;

    public EmailProductDto(Long productId, String productImg, String productName, EventType SEVENType,
                           EventType GSType, EventType EMARTType, EventType CUType, Boolean likeStat,
                           Boolean isReceived) {
        this.productId = productId;
        this.productImg = productImg;
        this.productName = productName;
        this.SEVENType = SEVENType != null ? SEVENType.name() : null;;
        this.GSType = GSType != null ? GSType.name() : null;
        this.EMARTType = EMARTType != null ? EMARTType.name() : null;
        this.CUType = CUType != null ? CUType.name() : null;
        this.likeStat = likeStat;
        this.isReceived = isReceived;
    }

}
