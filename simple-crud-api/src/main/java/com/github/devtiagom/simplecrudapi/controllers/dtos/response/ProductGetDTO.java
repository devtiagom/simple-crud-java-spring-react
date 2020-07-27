package com.github.devtiagom.simplecrudapi.controllers.dtos.response;

import com.github.devtiagom.simplecrudapi.domain.ProductDomain;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductGetDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String categoryName;

    public ProductGetDTO(ProductDomain productDomain) {
        this.id = productDomain.getId();
        this.name = productDomain.getName();
        this.description = productDomain.getDescription();
        this.price = productDomain.getPrice();
        this.stock = productDomain.getStock();
        this.categoryName = productDomain.getCategory().getName();
    }
}
