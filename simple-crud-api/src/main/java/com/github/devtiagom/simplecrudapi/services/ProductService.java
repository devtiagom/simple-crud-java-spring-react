package com.github.devtiagom.simplecrudapi.services;

import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import com.github.devtiagom.simplecrudapi.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDomain> getAllProducts() {
        return this.productRepository.findAll();
    }
}
