package com.ong.backend.dto.categoria;

import com.ong.backend.models.Categoria;
import com.ong.backend.models.TipoCategoria;

public record CategoriaResponseDTO(
    Long id,
    String nome,
    String descricao,
    TipoCategoria tipo
) {
    public CategoriaResponseDTO(Categoria categoria) {
        this(
            categoria.getId(),
            categoria.getNome(),
            categoria.getDescricao(),
            categoria.getTipo()
        );
    }
}
