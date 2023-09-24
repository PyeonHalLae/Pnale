package com.ssafy.special.product.model;

import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.MemberPickProd;
import com.ssafy.special.entity.Product;
import com.ssafy.special.memberpickprod.model.vo.MemberPickProdInfoDto;
import com.ssafy.special.product.model.vo.EventInfoDto;
import com.ssafy.special.product.model.vo.EventProductDto;
import com.ssafy.special.product.model.vo.ProductInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Map<String, Object>> findRecommandProducts() {
        return getRecommandProducts(productRepository.findRecommandProducts(PageRequest.of(0, 4)));
    }

    public Map<String, Object> findProductById(Long productId) {
        return getRecommandProduct(productRepository.findRecommandProduct(productId));
    }

    public Map<String, Object> findMainPageData() {
        Map<String, Object> mainData = new HashMap<>();

        //레시피 정보와 추천 상품 반환
        mainData.put("recipes", null);
        mainData.put("recommands",
                getRecommandProducts(productRepository.findRecommandProducts(PageRequest.of(0, 4))));
        return mainData;
    }

    public Map<String, Object> findSearchDate(Long productId){
        Map<String, Object> searchData = new HashMap<>();
        searchData.put("searchData", null);
        searchData.put("similar", null);
        searchData.put("recipes", null);
        return searchData;
    }

    //==============================================
    private List<Map<String, Object>> getRecommandProducts(List<Object[]> resultSets){
        return resultSets.stream()
                .map(this::getRecommandProduct)
                .collect(Collectors.toList());

    }

    private Map<String, Object> getRecommandProduct(Object[] resultSet) {
        Product pd = (Product) resultSet[0];
        EventProduct ed = (EventProduct) resultSet[1];
        MemberPickProd mpp = (MemberPickProd) resultSet[2];

        Map<String, Object> response = new HashMap<>();
        response.put("product", (pd != null) ? pd.toInfoDto() : ProductInfoDto.builder().build());
        response.put("event", (ed != null) ? ed.toInfoDto() : EventInfoDto.builder().build());
        response.put("userLike", (mpp != null) ? mpp.toInfoDto() : MemberPickProdInfoDto.builder().build());
        return response;
    }
}
