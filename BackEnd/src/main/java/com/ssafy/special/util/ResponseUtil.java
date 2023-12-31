package com.ssafy.special.util;

import com.ssafy.special.CSR.dtos.memberpick.MemberPickProdInfoDto;
import com.ssafy.special.CSR.dtos.product.EventInfoDto;
import com.ssafy.special.CSR.dtos.product.ProductInfoDto;
import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.MemberPickProd;
import com.ssafy.special.entity.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ResponseUtil {

    public static Page<Map<String, Object>> getPageProducts(Page<Object[]> data) {
        return data.map(ResponseUtil::toResponseData);
    }

    public static List<Map<String, Object>> getListProducts(List<Object[]> resultSets) {
        return resultSets.stream()
                .map(ResponseUtil::toResponseData)
                .collect(Collectors.toList());
    }

    private static Map<String, Object> toResponseData(Object[] resultSet) {
        Map<String, Object> response = new HashMap<>();

        Product pd = (Product) resultSet[0];
        EventProduct ep = (EventProduct) resultSet[1];
        response.put("product", (pd != null) ? pd.toInfoDto() : ProductInfoDto.builder().build());
        response.put("event", (ep != null) ? ep.toInfoDto() : EventInfoDto.builder().build());

        if(resultSet.length == 2){
            response.put("userLike", MemberPickProdInfoDto.builder().build());
        } else{
            MemberPickProd mpp = (MemberPickProd) resultSet[2];
            response.put("userLike", (mpp != null) ? mpp.toInfoDto() : MemberPickProdInfoDto.builder().build());
        }
        return response;
    }
}
