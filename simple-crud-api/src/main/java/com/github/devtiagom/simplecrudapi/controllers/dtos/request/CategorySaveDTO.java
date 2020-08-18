package com.github.devtiagom.simplecrudapi.controllers.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategorySaveDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Preenchimento Obrigatório.")
    private String name;
}
