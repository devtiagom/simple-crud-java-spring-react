package com.github.devtiagom.simplecrudapi.controllers.dtos.response;

import com.github.devtiagom.simplecrudapi.domain.CategoryDomain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryGetDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;

    public CategoryGetDTO(CategoryDomain categoryDomain) {
        this.id = categoryDomain.getId();
        this.name = categoryDomain.getName();
    }
}
