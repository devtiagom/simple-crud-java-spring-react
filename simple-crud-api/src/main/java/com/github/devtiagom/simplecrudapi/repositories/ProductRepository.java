package com.github.devtiagom.simplecrudapi.repositories;

import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductDomain, Long> {
    Page<ProductDomain> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}
