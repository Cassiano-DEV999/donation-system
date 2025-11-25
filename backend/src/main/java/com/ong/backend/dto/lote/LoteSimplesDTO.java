package com.ong.backend.dto.lote;

import com.ong.backend.models.Lote;

import java.time.LocalDate;

public record LoteSimplesDTO(
    Long id,
    String nomeProduto,
    Integer quantidadeAtual,
    LocalDate dataValidade,
    String codigoBarras
) {
    public LoteSimplesDTO(Lote lote) {
        this(
            lote.getId(),
            lote.getProduto().getNome(),
            lote.getQuantidadeAtual(),
            lote.getDataValidade(),
            lote.getCodigoBarras()
        );
    }
}
