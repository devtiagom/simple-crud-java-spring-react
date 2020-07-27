package com.github.devtiagom.simplecrudapi.controllers;

import com.github.devtiagom.simplecrudapi.controllers.dtos.response.CategoryGetDTO;
import com.github.devtiagom.simplecrudapi.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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
}
