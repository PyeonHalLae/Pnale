package com.ssafy.special.product;

import com.ssafy.special.product.model.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor //해당 어노테이션
public class ProductController {
    private final ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> getAllProducts(Pageable pageable){
        return ResponseEntity.ok(productService.findAllProducts(pageable));
    }
    @GetMapping("/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.findProduct(productId));
    }
}
