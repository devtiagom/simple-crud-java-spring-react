package com.github.devtiagom.simplecrudapi.services;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.ProductSaveDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import com.github.devtiagom.simplecrudapi.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public List<ProductDomain> getAllProducts() {
        return this.productRepository.findAll();
    }

    public Optional<ProductDomain> getOneProduct(Long id) {
        return this.productRepository.findById(id);
    }

    public Optional<ProductDomain> saveNewProduct(ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productToSave = fromDTO(productFromRequest);
        if (!productToSave.isPresent()) return productToSave;
        return Optional.of(this.productRepository.save(productToSave.get()));
    }

    private Optional<ProductDomain> fromDTO(ProductSaveDTO productFromRequest) {
        Optional<CategoryDomain> category = this.categoryService
                .getOneCategory(productFromRequest.getCategoryId());
        if (!category.isPresent()) return Optional.empty();
        ProductDomain product = ProductDomain
                .builder()
                .name(productFromRequest.getName())
                .description(productFromRequest.getDescription())
                .price(productFromRequest.getPrice())
                .stock(productFromRequest.getStock())
                .category(category.get())
                .build();
        return Optional.of(product);
    }
}
