package com.github.devtiagom.simplecrudapi.controllers.exceptions;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class FieldMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    private String fieldName;
    private String message;
}
