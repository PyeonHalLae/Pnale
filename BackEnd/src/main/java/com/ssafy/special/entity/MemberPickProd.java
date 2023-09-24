package com.ssafy.special.entity;

import com.ssafy.special.CSR.dtos.memberpick.MemberPickProdInfoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //외부에서 직접 생성자를 호출할 수 없도록 제한을 둠
public class MemberPickProd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long pickProdId;

    //외래키를 가지는 테이블은 memberLikeProd이므로 연관관계의 주인이 된다.
    //유저는 여러 개의 상품을 관심 상품으로 등록할 수 있다(유저 : 상품 = 1 : N)
    @ManyToOne
    @JoinColumn(name="product_id")
    Product product;

    @ManyToOne
    @JoinColumn(name="member_id")
    Member member;

    @Column(columnDefinition = "tinyint(1) default 1")
    boolean isReceived;

    @Column(columnDefinition = "tinyint(1) default 1")
    boolean likeStat;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime createdAt;

    @Column(columnDefinition = "TIMESTAMP")
    LocalDateTime updatedAt;


    //빌더 패턴을 적용하기 위해선 기본 생성자가 필요함
    @Builder
    public MemberPickProd( Member member, Product product){
        this.member = member;
        this.product = product;
        this.isReceived = true;
        this.likeStat = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updateLike() {
        this.likeStat = !this.likeStat;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateEmailReceive() {
        this.isReceived = !this.isReceived;
        this.updatedAt = LocalDateTime.now();
    }

    public MemberPickProdInfoDto toInfoDto(){
        return MemberPickProdInfoDto.builder()
                .pickProdId(this.pickProdId)
                .isReceived(this.isReceived)
                .likeStat(this.likeStat)
                .build();
    }
}
