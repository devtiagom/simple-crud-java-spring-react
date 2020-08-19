package com.github.devtiagom.simplecrudapi.services;

import com.github.devtiagom.simplecrudapi.controllers.dtos.request.CategorySaveDTO;
import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import com.github.devtiagom.simplecrudapi.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Page<CategoryDomain> getAllCategories(
            Integer page,
            Integer size,
            String direction,
            String orderBy
    ) {
        return this.categoryRepository.findAll(
                PageRequest.of(
                        page,
                        size,
                        Sort.Direction.valueOf(direction),
                        orderBy
                )
        );
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

    public Optional<CategoryDomain> updateCategory(Long id, CategorySaveDTO categoryFromRequest) {
        Optional<CategoryDomain> categoryFromDB = this.getOneCategory(id);
        if (!categoryFromDB.isPresent()) return Optional.empty();
        categoryFromDB.get().setName(categoryFromRequest.getName());
        return Optional.of(this.categoryRepository.save(categoryFromDB.get()));
    }

    public boolean deleteCategory(Long id) {
        Optional<CategoryDomain> categoryFromDB = this.getOneCategory(id);
        if (!categoryFromDB.isPresent()) return Boolean.FALSE;
        this.categoryRepository.delete(categoryFromDB.get());
        return Boolean.TRUE;
    }
}
