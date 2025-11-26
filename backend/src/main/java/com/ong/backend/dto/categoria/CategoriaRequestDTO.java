package com.ong.backend.dto.categoria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaRequestDTO(
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,
    
    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    String descricao,

    @Size(max = 50, message = "Ícone deve ter no máximo 50 caracteres")
    String icone // Emoji ou nome de ícone para UI
) {}
