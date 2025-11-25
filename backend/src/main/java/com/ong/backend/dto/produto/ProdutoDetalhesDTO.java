package com.ong.backend.dto.produto;

import com.ong.backend.dto.categoria.CategoriaResponseDTO;
import com.ong.backend.models.Produto;

public record ProdutoDetalhesDTO(
    Long id,
    String nome,
    String descricao,
    String codigoBarrasFabricante,
    CategoriaResponseDTO categoria,
    Integer totalEmEstoque
) {
    public ProdutoDetalhesDTO(Produto produto, Integer totalEmEstoque) {
        this(
            produto.getId(),
            produto.getNome(),
            produto.getDescricao(),
            produto.getCodigoBarrasFabricante(),
            new CategoriaResponseDTO(produto.getCategoria()),
            totalEmEstoque
        );
    }
}
