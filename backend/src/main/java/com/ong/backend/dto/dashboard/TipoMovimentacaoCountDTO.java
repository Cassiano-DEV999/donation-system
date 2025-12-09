package com.ong.backend.dto.dashboard;

public record TipoMovimentacaoCountDTO(
    String tipo,
    String label,
    Long quantidade
) {}

