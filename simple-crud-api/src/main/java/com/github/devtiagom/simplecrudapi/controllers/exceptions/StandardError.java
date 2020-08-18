package com.github.devtiagom.simplecrudapi.controllers.exceptions;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StandardError implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer status;
    private String msg;
    private Long timestamp;
}
