package com.ssafy.special.product.model;

import com.ssafy.special.entity.Product;
import com.ssafy.special.product.model.vo.ProductResponseDto;
import com.ssafy.special.product.model.vo.RecommandProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;


@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    public Page<ProductResponseDto> findAllProducts(Pageable pageable) {
        return getProductPages(productRepository.findAll(pageable));
    }

    public Page<ProductResponseDto> findAllProductsForSignUser(Pageable pageable, Long userId) {

        return null;
    }

    public Page<RecommandProduct> findRecommandProducts(Pageable pageable) {
        return getRecemandProduct(productRepository.findRecommandProducts(pageable));
    }

    private Page<RecommandProduct> getRecemandProduct(Page<Product> data) {
        return data.map(recP -> {
            RecommandProduct recommandProduct = modelMapper.map(recP, RecommandProduct.class);

            return recommandProduct;
        });
    }

    public ProductResponseDto findProduct(Long productId) {
        return modelMapper.map(
                productRepository.findById(productId).orElseThrow(()-> new RuntimeException("이현욱 잘못")),
                ProductResponseDto.class);
    }

    //Page<Product>를 Page<ProductResponseDto>로 변환
    private Page<ProductResponseDto> getProductPages(Page<Product> data){
        return data.map(product -> modelMapper.map(product, ProductResponseDto.class));
    }
}
