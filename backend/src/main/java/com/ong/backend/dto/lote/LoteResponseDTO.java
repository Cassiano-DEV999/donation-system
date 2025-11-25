package com.ong.backend.dto.lote;

import com.ong.backend.models.Lote;
import com.ong.backend.models.UnidadeMedida;

import java.time.LocalDate;

public record LoteResponseDTO(
    Long id,
    Long produtoId,
    String produtoNome,
    Integer quantidadeInicial,
    Integer quantidadeAtual,
    LocalDate dataEntrada,
    UnidadeMedida unidadeMedida,
    LocalDate dataValidade,
    String tamanho,
    String voltagem,
    String observacoes,
    String codigoBarras
) {
    public LoteResponseDTO(Lote lote) {
        this(
            lote.getId(),
            lote.getProduto().getId(),
            lote.getProduto().getNome(),
            lote.getQuantidadeInicial(),
            lote.getQuantidadeAtual(),
            lote.getDataEntrada(),
            lote.getUnidadeMedida(),
            lote.getDataValidade(),
            lote.getTamanho(),
            lote.getVoltagem(),
            lote.getObservacoes(),
            lote.getCodigoBarras()
        );
    }
}
