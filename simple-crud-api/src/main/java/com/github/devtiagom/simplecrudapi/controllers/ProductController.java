package com.github.devtiagom.simplecrudapi.controllers;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.ProductSaveDTO;
import com.github.devtiagom.simplecrudapi.controllers.dtos.response.ProductGetDTO;
import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import com.github.devtiagom.simplecrudapi.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping(path = "/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductGetDTO>> index(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy
    ) {
        Page<ProductGetDTO> products = this.productService
                .getAllProducts(page, size, direction, orderBy)
                .map(ProductGetDTO::new);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<ProductDomain> productOptional = this.productService.getOneProduct(id);
        if (!productOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found!");
        return ResponseEntity.ok().body(new ProductGetDTO(productOptional.get()));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productOptional = this.productService.saveNewProduct(productFromRequest);
        if (!productOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product category not found!");
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productOptional.get().getId())
                .toUri();
        return ResponseEntity.created(uri).body(new ProductGetDTO(productOptional.get()));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productOptional = this.productService.updateProduct(id, productFromRequest);
        if (!productOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product or category not found!");
        return ResponseEntity.ok().body(new ProductGetDTO(productOptional.get()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!this.productService.deleteProduct(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found!");
        return ResponseEntity.noContent().build();
    }
}
