package com.ong.backend.dto.doacao;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record EntradaDoacaoDTO(
    @NotEmpty(message = "A lista de itens não pode estar vazia")
    List<ItemDoacaoDTO> itens,

    @NotNull(message = "A data de entrada é obrigatória")
    LocalDate dataEntrada,
    
    String observacoesGerais
) {}