package com.github.devtiagom.simplecrudapi.repositories;

import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryDomain, Long> {}
