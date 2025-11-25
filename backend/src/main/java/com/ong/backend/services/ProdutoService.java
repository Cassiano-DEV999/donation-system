package com.ong.backend.services;

import com.ong.backend.dto.produto.ProdutoRequestDTO;
import com.ong.backend.dto.produto.ProdutoResponseDTO;
import com.ong.backend.dto.produto.ProdutoSimplesDTO;
import com.ong.backend.dto.produto.ProdutoDetalhesDTO;
import com.ong.backend.exceptions.ResourceNotFoundException;
import com.ong.backend.models.Categoria;
import com.ong.backend.models.Produto;
import com.ong.backend.repositories.LoteRepository;
import com.ong.backend.repositories.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final LoteRepository loteRepository;
    private final CategoriaService categoriaService;

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(ProdutoResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProdutoSimplesDTO> listarTodosSimples() {
        return produtoRepository.findAll()
                .stream()
                .map(ProdutoSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProdutoResponseDTO buscarPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", "id", id));
        return new ProdutoResponseDTO(produto);
    }

    @Transactional(readOnly = true)
    public ProdutoDetalhesDTO buscarDetalhesPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", "id", id));

        // Calcula o total em estoque somando quantidadeAtual de todos os lotes
        Integer totalEmEstoque = loteRepository.findByProdutoId(id)
                .stream()
                .mapToInt(lote -> lote.getQuantidadeAtual())
                .sum();

        return new ProdutoDetalhesDTO(produto, totalEmEstoque);
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> buscarPorCategoria(Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId)
                .stream()
                .map(ProdutoResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(ProdutoResponseDTO::new)
                .toList();
    }

    @Transactional
    public ProdutoResponseDTO criar(ProdutoRequestDTO dto) {
        Categoria categoria = categoriaService.buscarEntidadePorId(dto.categoriaId());

        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setDescricao(dto.descricao());
        produto.setCodigoBarrasFabricante(dto.codigoBarrasFabricante());
        produto.setCategoria(categoria);

        produto = produtoRepository.save(produto);
        return new ProdutoResponseDTO(produto);
    }

    @Transactional
    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", "id", id));

        Categoria categoria = categoriaService.buscarEntidadePorId(dto.categoriaId());

        produto.setNome(dto.nome());
        produto.setDescricao(dto.descricao());
        produto.setCodigoBarrasFabricante(dto.codigoBarrasFabricante());
        produto.setCategoria(categoria);

        produto = produtoRepository.save(produto);
        return new ProdutoResponseDTO(produto);
    }

    @Transactional
    public void deletar(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", "id", id));

        produtoRepository.delete(produto);
    }

    // Método auxiliar para buscar produto por ID (usado por outros services)
    @Transactional(readOnly = true)
    public Produto buscarEntidadePorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto", "id", id));
    }
}
