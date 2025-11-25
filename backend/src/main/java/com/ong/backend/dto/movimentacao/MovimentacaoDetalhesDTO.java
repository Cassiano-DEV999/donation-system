package com.ong.backend.dto.movimentacao;

import com.ong.backend.dto.lote.LoteSimplesDTO;
import com.ong.backend.dto.usuario.UsuarioSimplesDTO;
import com.ong.backend.models.Movimentacao;
import com.ong.backend.models.TipoMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoDetalhesDTO(
    Long id,
    LoteSimplesDTO lote,
    UsuarioSimplesDTO usuario,
    TipoMovimentacao tipo,
    Integer quantidade,
    LocalDateTime dataHora,
    Integer quantidadeAnterior,
    Integer quantidadeAtual
) {
    public MovimentacaoDetalhesDTO(Movimentacao movimentacao, Integer quantidadeAnterior, Integer quantidadeAtual) {
        this(
            movimentacao.getId(),
            new LoteSimplesDTO(movimentacao.getLote()),
            new UsuarioSimplesDTO(movimentacao.getUsuario()),
            movimentacao.getTipo(),
            movimentacao.getQuantidade(),
            movimentacao.getDataHora(),
            quantidadeAnterior,
            quantidadeAtual
        );
    }
}
