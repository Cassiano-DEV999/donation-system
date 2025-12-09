package com.ong.backend.dto.dashboard;

public record AlertasCriticosDTO(
    Long lotesVencendo,
    Long produtosEstoqueBaixo,
    Long lotesSemEstoque
) {}

