package com.github.devtiagom.simplecrudapi.controllers;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.CategorySaveDTO;
import com.github.devtiagom.simplecrudapi.controllers.dtos.response.CategoryGetDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.services.CategoryService;
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
@RequestMapping(path = "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryGetDTO>> index() {
        List<CategoryGetDTO> categories = this.categoryService
                .getAllCategories()
                .stream()
                .map(CategoryGetDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<CategoryDomain> categoryOptional = this.categoryService.getOneCategory(id);
        if (!categoryOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found!");
        CategoryGetDTO categoryDTO = new CategoryGetDTO(categoryOptional.get());
        return ResponseEntity.ok().body(categoryDTO);
    }

    @PostMapping
    public ResponseEntity<CategoryGetDTO> create(@RequestBody CategorySaveDTO categoryFromRequest) {
        CategoryDomain categorySaved = this.categoryService.saveNewCategory(categoryFromRequest);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(categorySaved.getId())
                .toUri();
        return ResponseEntity.created(uri).body(new CategoryGetDTO(categorySaved));
    }
}
