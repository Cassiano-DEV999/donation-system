package com.ong.backend.dto.produto;

import com.ong.backend.dto.categoria.CategoriaSimplesDTO;
import com.ong.backend.models.Produto;

public record ProdutoSimplesDTO(
    Long id,
    String nome,
    CategoriaSimplesDTO categoria
) {
    public ProdutoSimplesDTO(Produto produto) {
        this(
            produto.getId(),
            produto.getNome(),
            new CategoriaSimplesDTO(produto.getCategoria())
        );
    }
}
