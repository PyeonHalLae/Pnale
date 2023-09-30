package com.ssafy.special.CSR.services;

import com.ssafy.special.CSR.repositories.MemberPickProdRepository;
import com.ssafy.special.util.ResponseUtil;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.MemberPickProd;
import com.ssafy.special.entity.Product;
import com.ssafy.special.CSR.repositories.ProductRepository;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductService {
    // Service 및 Repository 의존 규칙
    // CRUD 중 R에 해당될 때만 Repository 사용
    private final ProductRepository productRepository;

    private final MemberRepository memberRepository;
    private final MemberPickProdRepository memberPickProdRepository;

    //페이지별 전체 행사상품 반환
    public Page<Map<String, Object>> findAllEventProducts(Pageable pageable) {
        return ResponseUtil.getPageProducts(productRepository.findAllProducts(pageable));
    }

    //레시피 정보와 추천 상품 반환
    public Map<String, Object> findMainPageData() {
        Map<String, Object> mainData = new HashMap<>();

        mainData.put("recipes", null);
        mainData.put("recommands", ResponseUtil.getListProducts(productRepository.findRecommandProducts(PageRequest.of(0, 4))));
        return mainData;
    }

    //추천상품 반환
    public List<Map<String, Object>> findRecommandProducts() {
        return ResponseUtil.getListProducts(productRepository.findRecommandProducts(PageRequest.of(0, 4)));
    }

    //상품 좋아요
    @Transactional
    public String pickToggle(Long productId, Long memberId) {
        Member findUser = getUserById(memberId);
        Product findProduct = getProductById(productId);

        return memberPickProdRepository.findByMember_MemberIdAndProduct_ProductId(memberId, productId)
                .map(upp -> { //객체가 존재함 likeStat을 true, false 토글형태로 전환한다.
                    updateUserLikeProduct(upp);
                    return findProduct.getProductName() + "에 대한 상태를 업데이트 했습니다.";
                }).orElseGet(() -> {
                    //객체가 존재하지 않음
                    addUserLikeProduct(findUser, findProduct);
                    return findProduct.getProductName() + "가 좋아요 목록에 추가되었습니다.";
                });
    }
    //이메일 수신체크
    @Transactional
    public String receiveToggle(Long productId, Long memberId) {
        Member findUser = getUserById(memberId);
        Product findProduct = getProductById(productId);

        MemberPickProd upp = memberPickProdRepository.findByMember_MemberIdAndProduct_ProductId(memberId, productId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.ULP_NOT_FOUND));
        updateEmailReceiveStatus(upp);
        return upp.getProduct().getProductName() + "의 이메일 수신 여부 정보를 업데이트 했습니다.";
    }

    //유저가 좋아요한 목록 반환
    public Page<Map<String, Object>> findPickProd(Pageable pageable, Long memberId) {//유저가 좋아요 한 것 반
        return ResponseUtil.getPageProducts(memberPickProdRepository.findByMember_MemberIdAndLikeStatTrue(memberId, pageable));
    }

    public Map<String, Object> findSearchDate(Long productId) {
        Map<String, Object> searchData = new HashMap<>();
        searchData.put("searchData", null);
        searchData.put("similar", null);
        searchData.put("recipes", null);
        return searchData;
    }


    //==============================================

    private Member getUserById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));
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
