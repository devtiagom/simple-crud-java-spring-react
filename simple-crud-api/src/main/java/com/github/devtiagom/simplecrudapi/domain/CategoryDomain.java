package com.github.devtiagom.simplecrudapi.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@Entity
@Table(name = "categories")
public class CategoryDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;

    @Setter
    private String name;

    @OneToMany(mappedBy = "category")
    private Set<ProductDomain> products = new HashSet<>();

    public CategoryDomain(String name) {
        this.name = name;
    }

    public Set<ProductDomain> addProduct(ProductDomain product) {
        this.products.add(product);
        return this.products;
    }
}
