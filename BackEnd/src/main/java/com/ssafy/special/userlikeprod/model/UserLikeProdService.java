package com.ssafy.special.userlikeprod.model;

import com.ssafy.special.entity.Product;
import com.ssafy.special.entity.User;
import com.ssafy.special.entity.UserLikeProd;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.exception.CustomExceptionType;
import com.ssafy.special.product.model.ProductRepository;
import com.ssafy.special.user.model.UserRepository;
import com.ssafy.special.userlikeprod.model.vo.UserLikeProdResponseDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserLikeProdService {
    // 각 서비스에서 타 서비스를 호출 할 수 밖에 없다. 그렇기 때문에 각 컨벤션을 정의한다.
    //CUD 작업 : service 호출
    //R   작업 : Repository 사용.

    //Service들

    //Repository들
    private final UserLikeProdRepository userLikeProdRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public Page<UserLikeProdResponseDto> findAllLike(Pageable pageable, Long userId) {
        return getAllLike(userLikeProdRepository.findByUser_UserIdAndLikeStatTrue(userId, pageable));
    }

    public String likeToggle(Long productId, Long userId) {
        User findUser = getUserById(userId);
        Product findProduct = getProductById(productId);

        return userLikeProdRepository.findByUser_UserIdAndProduct_ProductId(userId, productId)
                .map(ulp ->{ //객체가 존재함 likeStat을 true, false 토글형태로 전환한다.
                    updateUserLikeProduct(ulp);
                    return findProduct.getProductName() + "에 대한 상태를 업데이트 했습니다.";
                }).orElseGet( ()->{
                    //객체가 존재하지 않음
                    addUserLikeProduct(findUser, findProduct);
                    return findProduct.getProductName() + "을 좋아합니다.";
                });
    }

    //===============================================
    //서비스 내부에서만 사용하는 메소드는 private로 제한한다.
    private Page<UserLikeProdResponseDto> getAllLike(Page<UserLikeProd> data) {
        //Page객체에 있는 리스트 요소중 개별 객체를 ulp라 지칭
        return data.map(ulp ->{
            //UserLikeProd엔티티를 Dto로 매핑한다.
            return modelMapper.map(ulp, UserLikeProdResponseDto.class);
        });
    }
    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow( () -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
    }

    private Product getProductById(Long productId){
        return productRepository.findById(productId).orElseThrow( () -> new CustomException(CustomExceptionType.PRODUCT_NOT_FOUND));
    }

    private void updateUserLikeProduct(UserLikeProd ulp) {
        ulp.updateLike();
        userLikeProdRepository.save(ulp);
    }

    private void addUserLikeProduct(User user, Product product) {
        //빌더 패턴을 적용해 객체를 생성한다.
        UserLikeProd ulp = UserLikeProd.builder()
                .user(user)
                .product(product)
                .build();

        //DB에 저장한다.
        userLikeProdRepository.save(ulp);
    }
}
