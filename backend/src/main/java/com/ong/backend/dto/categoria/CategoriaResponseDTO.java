package com.ong.backend.dto.categoria;

import com.ong.backend.models.Categoria;

public record CategoriaResponseDTO(
    Long id,
    String nome,
    String descricao,
    String icone
) {
    public CategoriaResponseDTO(Categoria categoria) {
        this(
            categoria.getId(),
            categoria.getNome(),
            categoria.getDescricao(),
            categoria.getIcone()
        );
    }
}
