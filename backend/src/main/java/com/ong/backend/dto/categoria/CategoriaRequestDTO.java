package com.ong.backend.dto.categoria;

import com.ong.backend.models.TipoCategoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CategoriaRequestDTO(
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,
    
    @Size(max = 255, message = "Descrição deve ter no máximo 255 caracteres")
    String descricao,

    @NotNull(message = "Tipo é obrigatório")
    TipoCategoria tipo
) {}
