package com.ong.backend.dto.lote;

import com.ong.backend.models.UnidadeMedida;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record LoteRequestDTO(
    
    @NotNull(message = "Produto é obrigatório")
    Long produtoId,
    
    @NotNull(message = "Quantidade inicial é obrigatória")
    @Positive(message = "Quantidade inicial deve ser positiva")
    Integer quantidadeInicial,
    
    @NotNull(message = "Data de entrada é obrigatória")
    LocalDate dataEntrada,

    @NotNull(message = "Unidade de medida é obrigatória")
    UnidadeMedida unidadeMedida,
    
    LocalDate dataValidade,
    
    @Size(max = 50, message = "Tamanho deve ter no máximo 50 caracteres")
    String tamanho,
    
    @Size(max = 50, message = "Voltagem deve ter no máximo 50 caracteres")
    String voltagem,
    
    @Size(max = 500, message = "Observações devem ter no máximo 500 caracteres")
    String observacoes
) {}
