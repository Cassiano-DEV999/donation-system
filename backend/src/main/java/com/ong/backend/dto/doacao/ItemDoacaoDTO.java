package com.ong.backend.dto.doacao;

import com.ong.backend.models.UnidadeMedida;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public record ItemDoacaoDTO(
    @NotNull(message = "O ID do produto é obrigatório")
    Long produtoId,

    @NotNull(message = "A quantidade é obrigatória")
    @Positive(message = "A quantidade deve ser maior que zero")
    Integer quantidade,
    
    LocalDate validade,
    String tamanho,
    String voltagem,
    String observacoesItem,
    UnidadeMedida unidadeMedida 
) {}