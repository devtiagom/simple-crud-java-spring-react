package com.github.devtiagom.simplecrudapi.repositories;

import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductDomain, Long> {}
