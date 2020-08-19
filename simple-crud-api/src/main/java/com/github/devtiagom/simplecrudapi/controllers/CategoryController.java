package com.github.devtiagom.simplecrudapi.controllers;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.CategorySaveDTO;
import com.github.devtiagom.simplecrudapi.controllers.dtos.response.CategoryGetDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.services.CategoryService;
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
@RequestMapping(path = "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<CategoryGetDTO>> index(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "24") Integer size,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "name") String orderBy
    ) {
        Page<CategoryGetDTO> categories = this.categoryService
                .getAllCategories(page, size, direction, orderBy)
                .map(CategoryGetDTO::new);
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<CategoryDomain> categoryOptional = this.categoryService.getOneCategory(id);
        if (!categoryOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found!");
        return ResponseEntity.ok().body(new CategoryGetDTO(categoryOptional.get()));
    }

    @PostMapping
    public ResponseEntity<CategoryGetDTO> create(@Valid @RequestBody CategorySaveDTO categoryFromRequest) {
        CategoryDomain categoryFromDB = this.categoryService.saveNewCategory(categoryFromRequest);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(categoryFromDB.getId())
                .toUri();
        return ResponseEntity.created(uri).body(new CategoryGetDTO(categoryFromDB));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CategorySaveDTO categoryFromRequest) {
        Optional<CategoryDomain> categoryOptional = this.categoryService.updateCategory(id, categoryFromRequest);
        if (!categoryOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found!");
        return ResponseEntity.ok().body(new CategoryGetDTO(categoryOptional.get()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!this.categoryService.deleteCategory(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found!");
        return ResponseEntity.noContent().build();
    }
}
