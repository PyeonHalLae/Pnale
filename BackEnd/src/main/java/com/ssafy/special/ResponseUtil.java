package com.ssafy.special;

import com.ssafy.special.CSR.dtos.memberpick.MemberPickProdInfoDto;
import com.ssafy.special.CSR.dtos.product.EventInfoDto;
import com.ssafy.special.CSR.dtos.product.ProductInfoDto;
import com.ssafy.special.entity.EventProduct;
import com.ssafy.special.entity.MemberPickProd;
import com.ssafy.special.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ResponseUtil {
    public static Map<String, Object> toResponseData(Object[] resultSet) {
        Product pd = (Product) resultSet[0];
        EventProduct ed = (EventProduct) resultSet[1];
        MemberPickProd mpp = (MemberPickProd) resultSet[2];

        Map<String, Object> response = new HashMap<>();
        response.put("product", (pd != null) ? pd.toInfoDto() : ProductInfoDto.builder().build());
        response.put("event", (ed != null) ? ed.toInfoDto() : EventInfoDto.builder().build());
        response.put("userLike", (mpp != null) ? mpp.toInfoDto() : MemberPickProdInfoDto.builder().build());
        return response;
    }

    public static Page<Map<String, Object>> getPageProducts(Page<Object[]> data) {
        return data.map(ResponseUtil::toResponseData);
    }

    public static List<Map<String, Object>> getListProducts(List<Object[]> resultSets) {
        return resultSets.stream()
                .map(ResponseUtil::toResponseData)
                .collect(Collectors.toList());
    }
}
