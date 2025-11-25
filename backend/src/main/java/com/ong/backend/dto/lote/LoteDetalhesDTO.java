package com.ong.backend.dto.lote;

import com.ong.backend.dto.produto.ProdutoResponseDTO;
import com.ong.backend.models.Lote;

import java.time.LocalDate;

public record LoteDetalhesDTO(
    Long id,
    ProdutoResponseDTO produto,
    Integer quantidadeInicial,
    Integer quantidadeAtual,
    LocalDate dataEntrada,
    LocalDate dataValidade,
    String tamanho,
    String voltagem,
    String observacoes,
    String codigoBarras,
    Integer totalMovimentacoes
) {
    public LoteDetalhesDTO(Lote lote, Integer totalMovimentacoes) {
        this(
            lote.getId(),
            new ProdutoResponseDTO(lote.getProduto()),
            lote.getQuantidadeInicial(),
            lote.getQuantidadeAtual(),
            lote.getDataEntrada(),
            lote.getDataValidade(),
            lote.getTamanho(),
            lote.getVoltagem(),
            lote.getObservacoes(),
            lote.getCodigoBarras(),
            totalMovimentacoes
        );
    }
}
