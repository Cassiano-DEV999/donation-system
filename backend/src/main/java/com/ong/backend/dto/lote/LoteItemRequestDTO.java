package com.ong.backend.dto.lote;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public record LoteItemRequestDTO(
    
    @NotNull(message = "ID do produto é obrigatório")
    Long produtoId,
    
    @NotNull(message = "Quantidade é obrigatória")
    @Positive(message = "Quantidade deve ser positiva")
    Integer quantidade,
    
    LocalDate dataValidade,
    String tamanho,
    String voltagem
) {}
