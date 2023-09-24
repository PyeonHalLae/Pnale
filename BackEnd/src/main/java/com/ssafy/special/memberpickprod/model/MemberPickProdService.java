package com.ssafy.special.memberpickprod.model;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.Product;
import com.ssafy.special.entity.Member;
import com.ssafy.special.entity.MemberPickProd;

import com.ssafy.special.product.model.EventProductRepository;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomErrorCode;

import com.ssafy.special.product.model.ProductRepository;
import com.ssafy.special.product.model.ProductService;
import com.ssafy.special.member.model.MemberRepository;
import com.ssafy.special.memberpickprod.model.vo.MemberPickProdInfoDto;
import com.ssafy.special.product.model.vo.EventInfoDto;
import com.ssafy.special.product.model.vo.EventProductDto;
import com.ssafy.special.product.model.vo.ProductInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    private final EventProductRepository eventProductRepository;


    public Page<Map<String, Object>> findAllPick(Pageable pageable, Long userId) {
        return getAllLike(memberPickProdRepository.findByMember_MemberIdAndLikeStatTrue(userId, pageable));

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
    //서비스 내부에서만 사용하는 메소드는 private로 제한한다.
    private Page<Map<String,Object>> getAllLike(Page<Object[]> data) {
        //Page객체에 있는 리스트 요소중 개별 객체를 upp라 지칭
        return data.map(upp -> {
            Product pd = (Product) upp[0];
            EventProduct ed = (EventProduct) upp[1];
            MemberPickProd mpp = (MemberPickProd) upp[2];

            Map<String, Object> response = new HashMap<>();
            response.put("product", (pd != null) ? pd.toInfoDto() : ProductInfoDto.builder().build());
            response.put("event", (ed != null) ? ed.toInfoDto() : EventInfoDto.builder().build());
            response.put("userLike", (mpp != null) ? mpp.toInfoDto() : MemberPickProdInfoDto.builder().build());

            return response;
        });
    }

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
