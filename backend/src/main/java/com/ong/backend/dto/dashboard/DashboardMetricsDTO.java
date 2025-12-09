package com.ong.backend.dto.dashboard;

import java.util.List;

public record DashboardMetricsDTO(
    Long totalCategorias,
    Long totalProdutos,
    Long totalLotes,
    Long estoqueTotal,
    Integer movimentacoesHoje,
    AlertasCriticosDTO alertasCriticos,
    List<EvolucaoEstoqueDTO> evolucaoEstoque,
    List<TopProdutoDTO> top5ProdutosMaisDistribuidos,
    List<MovimentacaoResumoDTO> ultimasMovimentacoes,
    List<MovimentacaoPorDiaDTO> movimentacoesPorDia,
    List<TipoMovimentacaoCountDTO> movimentacoesPorTipo
) {}

