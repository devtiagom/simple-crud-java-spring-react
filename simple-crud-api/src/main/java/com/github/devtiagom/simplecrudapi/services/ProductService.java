package com.github.devtiagom.simplecrudapi.services;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.ProductSaveDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import com.github.devtiagom.simplecrudapi.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public Page<ProductDomain> getAllProducts(
            Integer page,
            Integer size,
            String direction,
            String orderBy
    ) {
        return this.productRepository.findAll(
                PageRequest.of(
                        page,
                        size,
                        Sort.Direction.valueOf(direction),
                        orderBy
                )
        );
    }

    public Optional<ProductDomain> getOneProduct(Long id) {
        return this.productRepository.findById(id);
    }

    public Optional<ProductDomain> saveNewProduct(ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productToSave = fromDTO(productFromRequest);
        if (!productToSave.isPresent()) return Optional.empty();
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

    public Optional<ProductDomain> updateProduct(Long id, ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productFromDB = this.getOneProduct(id);
        Optional<CategoryDomain> categoryFromDB = this.categoryService
                .getOneCategory(productFromRequest.getCategoryId());
        if (!productFromDB.isPresent() || !categoryFromDB.isPresent()) return Optional.empty();
        ProductDomain productToUpdate = productFromDB.get();
        productToUpdate.setName(productFromRequest.getName());
        productToUpdate.setDescription(productFromRequest.getDescription());
        productToUpdate.setPrice(productFromRequest.getPrice());
        productToUpdate.setStock(productFromRequest.getStock());
        productToUpdate.setCategory(categoryFromDB.get());
        return Optional.of(this.productRepository.save(productToUpdate));
    }

    public boolean deleteProduct(Long id) {
        Optional<ProductDomain> productFromDB = this.getOneProduct(id);
        if (!productFromDB.isPresent()) return Boolean.FALSE;
        this.productRepository.delete(productFromDB.get());
        return Boolean.TRUE;
    }
}
