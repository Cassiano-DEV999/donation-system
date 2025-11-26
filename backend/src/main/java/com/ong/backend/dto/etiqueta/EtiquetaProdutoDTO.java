package com.ong.backend.dto.etiqueta;

public record EtiquetaProdutoDTO(
    Long produtoId,
    String nome,
    String categoria,
    String codigoBarras,
    String qrCodeBase64
) {}
