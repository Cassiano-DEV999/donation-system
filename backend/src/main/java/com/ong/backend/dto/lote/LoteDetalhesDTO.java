package com.ong.backend.dto.lote;

import com.ong.backend.models.Lote;
import com.ong.backend.models.UnidadeMedida;

import java.time.LocalDate;
import java.util.List;

public record LoteDetalhesDTO(
    Long id,
    List<LoteItemResponseDTO> itens,
    Integer quantidadeInicial,
    Integer quantidadeAtual,
    LocalDate dataEntrada,
    UnidadeMedida unidadeMedida,
    String observacoes,
    String codigoBarras,
    Integer totalMovimentacoes
) {
    public LoteDetalhesDTO(Lote lote, Integer totalMovimentacoes) {
        this(
            lote.getId(),
            lote.getItens().stream().map(LoteItemResponseDTO::new).toList(),
            lote.getQuantidadeInicial(),
            lote.getQuantidadeAtual(),
            lote.getDataEntrada(),
            lote.getUnidadeMedida(),
            lote.getObservacoes(),
            lote.getCodigoBarras(),
            totalMovimentacoes
        );
    }
}
