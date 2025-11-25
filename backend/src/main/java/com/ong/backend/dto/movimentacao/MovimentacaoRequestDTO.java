package com.ong.backend.dto.movimentacao;

import com.ong.backend.models.TipoMovimentacao;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MovimentacaoRequestDTO(
    
    @NotNull(message = "Lote é obrigatório")
    Long loteId,
    
    @NotNull(message = "Usuário é obrigatório")
    Long usuarioId,
    
    @NotNull(message = "Tipo de movimentação é obrigatório")
    TipoMovimentacao tipo,
    
    @NotNull(message = "Quantidade é obrigatória")
    @Positive(message = "Quantidade deve ser positiva")
    Integer quantidade
) {}
