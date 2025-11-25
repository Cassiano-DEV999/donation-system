package com.ong.backend.services;

import com.ong.backend.dto.movimentacao.MovimentacaoRequestDTO;
import com.ong.backend.dto.movimentacao.MovimentacaoResponseDTO;
import com.ong.backend.dto.movimentacao.MovimentacaoSimplesDTO;
import com.ong.backend.dto.movimentacao.MovimentacaoDetalhesDTO;
import com.ong.backend.exceptions.ResourceNotFoundException;
import com.ong.backend.models.Lote;
import com.ong.backend.models.Movimentacao;
import com.ong.backend.models.TipoMovimentacao;
import com.ong.backend.models.Usuario;
import com.ong.backend.repositories.MovimentacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final LoteService loteService;
    private final UsuarioService usuarioService;

    @Transactional(readOnly = true)
    public List<MovimentacaoResponseDTO> listarTodas() {
        return movimentacaoRepository.findAll()
                .stream()
                .map(MovimentacaoResponseDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MovimentacaoSimplesDTO> listarTodasSimples() {
        return movimentacaoRepository.findAll()
                .stream()
                .map(MovimentacaoSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public MovimentacaoResponseDTO buscarPorId(Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movimentação", "id", id));
        return new MovimentacaoResponseDTO(movimentacao);
    }

    @Transactional(readOnly = true)
    public MovimentacaoDetalhesDTO buscarDetalhesPorId(Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movimentação", "id", id));

        // Calcula quantidade anterior e atual baseado no tipo de movimentação
        int quantidadeAtual = movimentacao.getLote().getQuantidadeAtual();
        int quantidadeAnterior = calcularQuantidadeAnterior(movimentacao, quantidadeAtual);

        return new MovimentacaoDetalhesDTO(movimentacao, quantidadeAnterior, quantidadeAtual);
    }

    @Transactional(readOnly = true)
    public List<MovimentacaoSimplesDTO> buscarPorLote(Long loteId) {
        return movimentacaoRepository.findByLoteIdOrderByDataHoraDesc(loteId)
                .stream()
                .map(MovimentacaoSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MovimentacaoSimplesDTO> buscarPorUsuario(Long usuarioId) {
        return movimentacaoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(MovimentacaoSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MovimentacaoSimplesDTO> buscarPorTipo(TipoMovimentacao tipo) {
        return movimentacaoRepository.findByTipo(tipo)
                .stream()
                .map(MovimentacaoSimplesDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MovimentacaoSimplesDTO> buscarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return movimentacaoRepository.findByDataHoraBetween(inicio, fim)
                .stream()
                .map(MovimentacaoSimplesDTO::new)
                .toList();
    }

    @Transactional
    public MovimentacaoResponseDTO criar(MovimentacaoRequestDTO dto) {
        Lote lote = loteService.buscarEntidadePorId(dto.loteId());
        Usuario usuario = usuarioService.buscarEntidadePorId(dto.usuarioId());

        // Calcula o delta baseado no tipo de movimentação
        int delta = calcularDelta(dto.tipo(), dto.quantidade());

        // Atualiza a quantidade do lote
        loteService.atualizarQuantidade(dto.loteId(), delta);

        // Cria a movimentação
        Movimentacao movimentacao = new Movimentacao();
        movimentacao.setLote(lote);
        movimentacao.setUsuario(usuario);
        movimentacao.setTipo(dto.tipo());
        movimentacao.setQuantidade(dto.quantidade());
        movimentacao.setDataHora(LocalDateTime.now());

        movimentacao = movimentacaoRepository.save(movimentacao);
        return new MovimentacaoResponseDTO(movimentacao);
    }

    @Transactional
    public void deletar(Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movimentação", "id", id));

        movimentacaoRepository.delete(movimentacao);
    }

    // Métodos auxiliares
    private int calcularDelta(TipoMovimentacao tipo, int quantidade) {
        return switch (tipo) {
            case ENTRADA, AJUSTE_GANHO -> quantidade;  // Positivo
            case SAIDA, AJUSTE_PERDA -> -quantidade;   // Negativo
        };
    }

    private int calcularQuantidadeAnterior(Movimentacao movimentacao, int quantidadeAtual) {
        int delta = calcularDelta(movimentacao.getTipo(), movimentacao.getQuantidade());
        return quantidadeAtual - delta;
    }
}
