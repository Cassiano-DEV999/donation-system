package com.ong.backend.services;

import com.ong.backend.dto.lote.LoteRequestDTO;
import com.ong.backend.dto.lote.LoteResponseDTO;
import com.ong.backend.dto.lote.LoteSimplesDTO;
import com.ong.backend.dto.lote.LoteDetalhesDTO;
import com.ong.backend.exceptions.BusinessException;
import com.ong.backend.exceptions.ResourceNotFoundException;
import com.ong.backend.models.Lote;
import com.ong.backend.models.Produto;
import com.ong.backend.repositories.LoteRepository;
import com.ong.backend.repositories.MovimentacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoteService {

    private final LoteRepository loteRepository;
    private final MovimentacaoRepository movimentacaoRepository;
    private final ProdutoService produtoService;
    private final UsuarioService usuarioService;

    @Transactional(readOnly = true)
    public List<LoteResponseDTO> listarTodos() {
        return loteRepository.findAll()
                .stream()
                .map(LoteResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LoteResponseDTO> listarComFiltros(Long produtoId, String dataEntradaInicio, String dataEntradaFim, Boolean comEstoque) {
        List<Lote> lotes = loteRepository.findAll();
        
        return lotes.stream()
                .filter(l -> produtoId == null || l.getItens().stream().anyMatch(item -> item.getProduto().getId().equals(produtoId)))
                .filter(l -> dataEntradaInicio == null || dataEntradaInicio.trim().isEmpty() || !l.getDataEntrada().isBefore(LocalDate.parse(dataEntradaInicio)))
                .filter(l -> dataEntradaFim == null || dataEntradaFim.trim().isEmpty() || !l.getDataEntrada().isAfter(LocalDate.parse(dataEntradaFim)))
                .filter(l -> comEstoque == null || !comEstoque || l.getQuantidadeAtual() > 0)
                .map(LoteResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LoteSimplesDTO> listarTodosSimples() {
        return loteRepository.findAll()
                .stream()
                .map(LoteSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public LoteResponseDTO buscarPorId(Long id) {
        Lote lote = loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", id));
        return new LoteResponseDTO(lote);
    }

    @Transactional(readOnly = true)
    public LoteDetalhesDTO buscarDetalhesPorId(Long id) {
        Lote lote = loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", id));

        Integer totalMovimentacoes = movimentacaoRepository.findByLoteId(id).size();

        return new LoteDetalhesDTO(lote, totalMovimentacoes);
    }

    @Transactional(readOnly = true)
    public List<LoteResponseDTO> buscarPorProduto(Long produtoId) {
        return loteRepository.findAll()
                .stream()
                .filter(l -> l.getItens().stream().anyMatch(item -> item.getProduto().getId().equals(produtoId)))
                .map(LoteResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LoteSimplesDTO> buscarProximosAoVencimento(int dias) {
        LocalDate dataLimite = LocalDate.now().plusDays(dias);
        return loteRepository.findAll()
                .stream()
                .filter(lote -> lote.getQuantidadeAtual() > 0)
                .filter(lote -> lote.getItens().stream()
                        .anyMatch(item -> item.getDataValidade() != null && 
                                         item.getDataValidade().isBefore(dataLimite)))
                .map(LoteSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LoteSimplesDTO> buscarComEstoque() {
        return loteRepository.findByQuantidadeAtualGreaterThan(0)
                .stream()
                .map(LoteSimplesDTO::new)
                .toList();
    }

    @Transactional
    public LoteResponseDTO criar(LoteRequestDTO dto, String emailUsuarioAutenticado) {
        // Calcular quantidade total
        int quantidadeTotal = dto.itens().stream()
                .mapToInt(item -> item.quantidade())
                .sum();

        if (quantidadeTotal <= 0) {
            throw new BusinessException("Quantidade total deve ser maior que zero");
        }

        // Criar lote
        Lote lote = new Lote();
        lote.setQuantidadeInicial(quantidadeTotal);
        lote.setQuantidadeAtual(quantidadeTotal);
        lote.setDataEntrada(dto.dataEntrada());
        lote.setUnidadeMedida(dto.unidadeMedida());
        lote.setObservacoes(dto.observacoes());

        // Salvar lote primeiro para gerar ID
        lote = loteRepository.save(lote);

        // Criar itens do lote
        Lote finalLote = lote;
        dto.itens().forEach(itemDto -> {
            Produto produto = produtoService.buscarEntidadePorId(itemDto.produtoId());
            
            com.ong.backend.models.LoteItem item = new com.ong.backend.models.LoteItem();
            item.setLote(finalLote);
            item.setProduto(produto);
            item.setQuantidade(itemDto.quantidade());
            item.setDataValidade(itemDto.dataValidade());
            item.setTamanho(itemDto.tamanho());
            item.setVoltagem(itemDto.voltagem());
            
            finalLote.getItens().add(item);
        });

        lote = loteRepository.save(lote);

        // Auto-criar movimentação de ENTRADA
        criarMovimentacaoEntrada(lote, emailUsuarioAutenticado);

        return new LoteResponseDTO(lote);
    }

    private void criarMovimentacaoEntrada(Lote lote, String emailUsuarioAutenticado) {
        com.ong.backend.models.Usuario usuario = usuarioService.buscarEntidadePorEmail(emailUsuarioAutenticado);
        
        com.ong.backend.models.Movimentacao movimentacao = new com.ong.backend.models.Movimentacao();
        movimentacao.setLote(lote);
        movimentacao.setUsuario(usuario);
        movimentacao.setTipo(com.ong.backend.models.TipoMovimentacao.ENTRADA);
        movimentacao.setQuantidade(lote.getQuantidadeInicial());
        movimentacao.setDataHora(java.time.LocalDateTime.now());
        
        movimentacaoRepository.save(movimentacao);
    }

    @Transactional
    public LoteResponseDTO atualizar(Long id, LoteRequestDTO dto) {
        Lote lote = loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", id));

        // Não permitir atualizar se houver movimentações
        if (!movimentacaoRepository.findByLoteId(id).isEmpty()) {
            throw new BusinessException("Não é possível atualizar lote com movimentações. Crie um novo lote.");
        }

        // Calcular nova quantidade total
        int quantidadeTotal = dto.itens().stream()
                .mapToInt(item -> item.quantidade())
                .sum();

        lote.setQuantidadeInicial(quantidadeTotal);
        lote.setQuantidadeAtual(quantidadeTotal);
        lote.setDataEntrada(dto.dataEntrada());
        lote.setUnidadeMedida(dto.unidadeMedida());
        lote.setObservacoes(dto.observacoes());

        // Limpar itens antigos e adicionar novos
        lote.getItens().clear();
        
        final Lote finalLote = lote;
        dto.itens().forEach(itemDto -> {
            Produto produto = produtoService.buscarEntidadePorId(itemDto.produtoId());
            
            com.ong.backend.models.LoteItem item = new com.ong.backend.models.LoteItem();
            item.setLote(finalLote);
            item.setProduto(produto);
            item.setQuantidade(itemDto.quantidade());
            item.setDataValidade(itemDto.dataValidade());
            item.setTamanho(itemDto.tamanho());
            item.setVoltagem(itemDto.voltagem());
            
            finalLote.getItens().add(item);
        });

        lote = loteRepository.save(lote);
        return new LoteResponseDTO(lote);
    }

    @Transactional
    public void deletar(Long id) {
        Lote lote = loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", id));

        if (!movimentacaoRepository.findByLoteId(id).isEmpty()) {
            throw new BusinessException("Não é possível deletar um lote que possui movimentações");
        }

        loteRepository.delete(lote);
    }

    @Transactional
    public void atualizarQuantidade(Long loteId, int delta) {
        Lote lote = loteRepository.findById(loteId)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", loteId));

        int novaQuantidade = lote.getQuantidadeAtual() + delta;

        if (novaQuantidade < 0) {
            throw new BusinessException("Quantidade insuficiente em estoque. Disponível: " + lote.getQuantidadeAtual());
        }

        lote.setQuantidadeAtual(novaQuantidade);
        loteRepository.save(lote);
    }

    @Transactional(readOnly = true)
    public Lote buscarEntidadePorId(Long id) {
        return loteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lote", "id", id));
    }
}
