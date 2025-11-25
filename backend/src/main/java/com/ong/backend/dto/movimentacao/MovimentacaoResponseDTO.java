package com.ong.backend.dto.movimentacao;

import com.ong.backend.dto.lote.LoteResponseDTO;
import com.ong.backend.dto.usuario.UsuarioResponseDTO;
import com.ong.backend.models.Movimentacao;
import com.ong.backend.models.TipoMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoResponseDTO(
    Long id,
    LoteResponseDTO lote,
    UsuarioResponseDTO usuario,
    TipoMovimentacao tipo,
    Integer quantidade,
    LocalDateTime dataHora
) {
    public MovimentacaoResponseDTO(Movimentacao movimentacao) {
        this(
            movimentacao.getId(),
            new LoteResponseDTO(movimentacao.getLote()),
            new UsuarioResponseDTO(movimentacao.getUsuario()),
            movimentacao.getTipo(),
            movimentacao.getQuantidade(),
            movimentacao.getDataHora()
        );
    }
}
