package com.ong.backend.dto.lote;

import com.ong.backend.models.UnidadeMedida;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record LoteRequestDTO(
    
    @NotEmpty(message = "Pelo menos um produto é obrigatório")
    @Valid
    List<LoteItemRequestDTO> itens,
    
    @NotNull(message = "Data de entrada é obrigatória")
    LocalDate dataEntrada,

    @NotNull(message = "Unidade de medida é obrigatória")
    UnidadeMedida unidadeMedida,
    
    @Size(max = 500, message = "Observações devem ter no máximo 500 caracteres")
    String observacoes
) {}
