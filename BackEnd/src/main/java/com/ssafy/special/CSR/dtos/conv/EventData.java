package com.ssafy.special.CSR.dtos.conv;

import com.ssafy.special.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventData {
    EventType type;
    LocalDate date;
    String moreImg;
}
