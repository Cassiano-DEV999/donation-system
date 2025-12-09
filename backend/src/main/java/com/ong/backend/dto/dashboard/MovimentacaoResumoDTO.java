package com.ong.backend.dto.dashboard;

public record MovimentacaoResumoDTO(
    Long id,
    String dataHora,
    String produtoNome,
    String tipo,
    Integer quantidade,
    String usuarioNome
) {}

