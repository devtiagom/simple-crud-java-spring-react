package com.github.devtiagom.simplecrudapi.services;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.CategorySaveDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDomain> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    public Optional<CategoryDomain> getOneCategory(Long id) {
        return this.categoryRepository.findById(id);
    }

    public CategoryDomain saveNewCategory(CategorySaveDTO categoryFromRequest) {
        return this.categoryRepository.save(fromDTO(categoryFromRequest));
    }

    private CategoryDomain fromDTO(CategorySaveDTO categoryFromRequest) {
        return new CategoryDomain(categoryFromRequest.getName());
    }
}
