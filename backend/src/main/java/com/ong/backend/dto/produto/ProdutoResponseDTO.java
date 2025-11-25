package com.ong.backend.dto.produto;

import com.ong.backend.dto.categoria.CategoriaResponseDTO;
import com.ong.backend.models.Produto;

public record ProdutoResponseDTO(
    Long id,
    String nome,
    String descricao,
    String codigoBarrasFabricante,
    CategoriaResponseDTO categoria
) {
    public ProdutoResponseDTO(Produto produto) {
        this(
            produto.getId(),
            produto.getNome(),
            produto.getDescricao(),
            produto.getCodigoBarrasFabricante(),
            new CategoriaResponseDTO(produto.getCategoria())
        );
    }
}
