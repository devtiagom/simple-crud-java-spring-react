package com.github.devtiagom.simplecrudapi.controllers.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductSaveDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Long categoryId;
}
