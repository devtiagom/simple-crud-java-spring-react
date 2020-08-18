package com.github.devtiagom.simplecrudapi.controllers.exceptions;

import lombok.Getter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
public class ValidationError extends StandardError implements Serializable {

    private static final long serialVersionUID = 1L;

    private final Set<FieldMessage> errors = new HashSet<>();

    public ValidationError(Integer status, String msg, Long timestamp) {
        super(status, msg, timestamp);
    }

    public void addError(String fieldName, String message) {
        this.errors.add(new FieldMessage(fieldName, message));
    }
}
