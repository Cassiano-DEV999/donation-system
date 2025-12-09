package com.ong.backend.dto.dashboard;

public record MovimentacaoPorDiaDTO(
    String dia,
    Integer quantidade,
    Integer entradas,
    Integer saidas
) {}

