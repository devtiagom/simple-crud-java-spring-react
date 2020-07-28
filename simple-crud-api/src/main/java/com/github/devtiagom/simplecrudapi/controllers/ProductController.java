package com.github.devtiagom.simplecrudapi.controllers;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.ProductSaveDTO;
import com.github.devtiagom.simplecrudapi.controllers.dtos.response.ProductGetDTO;
import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import com.github.devtiagom.simplecrudapi.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductGetDTO>> index() {
        List<ProductGetDTO> products = this.productService
                .getAllProducts()
                .stream()
                .map(ProductGetDTO::new)
                .collect(Collectors.toList());
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
    public ResponseEntity<?> create(@RequestBody ProductSaveDTO productFromRequest) {
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
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductSaveDTO productFromRequest) {
        Optional<ProductDomain> productOptional = this.productService.updateProduct(id, productFromRequest);
        if (!productOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product or category not found!");
        return ResponseEntity.ok().body(new ProductGetDTO(productOptional.get()));
    }
}
