package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.repositories.MemberPickProdRepository;
import com.ssafy.special.util.ResponseUtil;
import com.ssafy.special.entity.Product;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.MemberPickProd;

import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomErrorCode;

import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class MemberPickProdService {
    // 각 서비스에서 타 서비스를 호출 할 수 밖에 없다. 그렇기 때문에 각 컨벤션을 정의한다.
    //CUD 작업 : service 호출
    //R   작업 : Repository 사용.

    //Service들
    private final ProductService productService;

    //Repository들
    private final MemberPickProdRepository memberPickProdRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;


    public Page<Map<String, Object>> findAllPick(Pageable pageable, Long userId) {
        return ResponseUtil.getPageProducts(memberRepository.findByMember_MemberIdAndLikeStatTrue(userId, pageable));
    }

    public String pickToggle(Long productId, Long userId) {
        Member findUser = getUserById(userId);
        Product findProduct = getProductById(productId);

        return memberPickProdRepository.findByMember_MemberIdAndProduct_ProductId(userId, productId)
                .map(upp -> { //객체가 존재함 likeStat을 true, false 토글형태로 전환한다.
                    updateUserLikeProduct(upp);

                    return findProduct.getProductName() + "에 대한 상태를 업데이트 했습니다.";
                }).orElseGet(() -> {
                    //객체가 존재하지 않음
                    addUserLikeProduct(findUser, findProduct);
                    return findProduct.getProductName() + "가 좋아요 목록에 추가되었습니다.";
                });
    }

    public String receiveToggle(Long productId, Long userId) {
        Member findUser = getUserById(userId);
        Product findProduct = getProductById(productId);

        MemberPickProd upp = memberPickProdRepository
                .findByMember_MemberIdAndProduct_ProductId(userId, productId)
                .orElseThrow(()-> new CustomException(CustomErrorCode.ULP_NOT_FOUND));
        updateEmailReceiveStatus(upp);
        return upp.getProduct().getProductName() + "의 이메일 수신 여부 정보를 업데이트 했습니다.";
    }

    //===============================================

    private Member getUserById(Long userId) {
        return memberRepository.findById(userId).orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));
    }

    private Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new CustomException(CustomErrorCode.PRODUCT_NOT_FOUND));
    }

    private void updateUserLikeProduct(MemberPickProd upp) {
        upp.updateLike();
        memberPickProdRepository.save(upp);
    }

    private void updateEmailReceiveStatus(MemberPickProd upp) {
        upp.updateEmailReceive();
        memberPickProdRepository.save(upp);
    }

    private void addUserLikeProduct(Member member, Product product) {
        //빌더 패턴을 적용해 객체를 생성한다.
        MemberPickProd upp = MemberPickProd.builder()
                .member(member)
                .product(product)
                .build();

        //DB에 저장한다.
        memberPickProdRepository.save(upp);
    }
}
