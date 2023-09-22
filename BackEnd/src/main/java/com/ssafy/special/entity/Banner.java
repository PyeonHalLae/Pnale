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
    Long bannerId;

    @Column(nullable = false)
    String BannerName;

    @Enumerated(EnumType.STRING)
    CorpType corpType;

    @Column(columnDefinition = "tinyint(1) default 0")
    boolean isStarted;

    @Column(nullable = false)
    String eigen;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;

}
