package com.ong.backend.dto.etiqueta;

import java.util.List;

public record EtiquetaLoteDTO(
    Long loteId,
    List<ItemLoteEtiquetaDTO> produtos,
    String dataEntrada,
    Integer quantidadeTotal,
    String unidadeMedida,
    String observacoes,
    String codigoBarras
) {}
