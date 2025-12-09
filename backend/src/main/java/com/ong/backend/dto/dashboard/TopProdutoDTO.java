package com.ong.backend.dto.dashboard;

public record TopProdutoDTO(
    String produtoNome,
    Long totalSaidas,
    String ultimaSaida
) {}

