package com.ssafy.special.entity;

import com.ssafy.special.enums.CorpType;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long eventId;

    @Column(nullable = false)
    String eventName;

    @Enumerated(EnumType.STRING)
    CorpType corpType;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean isStarted;

    @Column(nullable = false)
    String eigen;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

}