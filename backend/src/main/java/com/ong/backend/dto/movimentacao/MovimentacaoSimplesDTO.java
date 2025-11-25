package com.ong.backend.dto.movimentacao;

import com.ong.backend.models.Movimentacao;
import com.ong.backend.models.TipoMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoSimplesDTO(
    Long id,
    String nomeLote,
    String nomeUsuario,
    TipoMovimentacao tipo,
    Integer quantidade,
    LocalDateTime dataHora
) {
    public MovimentacaoSimplesDTO(Movimentacao movimentacao) {
        this(
            movimentacao.getId(),
            movimentacao.getLote().getProduto().getNome(),
            movimentacao.getUsuario().getNome(),
            movimentacao.getTipo(),
            movimentacao.getQuantidade(),
            movimentacao.getDataHora()
        );
    }
}
