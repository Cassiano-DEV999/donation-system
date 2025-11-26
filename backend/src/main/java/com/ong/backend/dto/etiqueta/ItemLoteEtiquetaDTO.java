package com.ong.backend.dto.etiqueta;

public record ItemLoteEtiquetaDTO(
    String nomeProduto,
    Integer quantidade,
    String dataValidade,
    String tamanho,
    String voltagem
) {}
