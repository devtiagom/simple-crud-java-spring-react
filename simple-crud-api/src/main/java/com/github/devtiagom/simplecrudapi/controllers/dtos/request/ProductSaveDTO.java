package com.github.devtiagom.simplecrudapi.controllers.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductSaveDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Preenchimento Obrigatório.")
    private String name;

    @NotEmpty(message = "Preenchimento Obrigatório.")
    private String description;

    @NotNull(message = "Preenchimento Obrigatório.")
    private BigDecimal price;

    @NotNull(message = "Preenchimento Obrigatório.")
    private Integer stock;

    @NotNull(message = "Preenchimento Obrigatório.")
    private Long categoryId;
}
