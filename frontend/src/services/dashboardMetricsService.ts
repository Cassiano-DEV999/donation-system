/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient as api } from "@/shared/api/client";

export interface AlertasCriticos {
  lotesVencendo: number;
  lotesVencendo7Dias: any[];
  produtosEstoqueBaixo: number;
  produtosEstoqueBaixoDetalhes: any[];
  lotesSemEstoque: number;
}

export interface EvolucaoEstoque {
  dia: string;
  estoque: number;
  entradas: number;
  saidas: number;
}

export interface ProdutoMaisDistribuido {
  produtoNome: string;
  totalSaidas: number;
  ultimaSaida: string;
}

export const dashboardMetricsService = {
  async getAlertasCriticos(): Promise<AlertasCriticos> {
    try {
      // Busca lotes vencendo em 7 dias
      const lotesVencendoResponse = await api.get("/lotes/vencimento", {
        params: { dias: 7 },
      });
      const lotesVencendo = lotesVencendoResponse.data || [];

      // Busca todos os lotes com estoque
      const lotesResponse = await api.get("/lotes", {
        params: { comEstoque: true, size: 1000 },
      });
      const lotes = lotesResponse.data?.content || [];

      // Filtra lotes com estoque baixo (menos de 5 unidades)
      const lotesEstoqueBaixo = lotes.filter(
        (lote: any) => lote.quantidadeAtual < 5 && lote.quantidadeAtual > 0
      );

      // Conta lotes sem estoque (quantidadeAtual = 0)
      const lotesSemEstoqueResponse = await api.get("/lotes", {
        params: { size: 1000 },
      });
      const todosLotes = lotesSemEstoqueResponse.data?.content || [];
      const lotesSemEstoque = todosLotes.filter(
        (lote: any) => lote.quantidadeAtual === 0
      ).length;

      return {
        lotesVencendo: lotesVencendo.length,
        lotesVencendo7Dias: lotesVencendo,
        produtosEstoqueBaixo: lotesEstoqueBaixo.length,
        produtosEstoqueBaixoDetalhes: lotesEstoqueBaixo,
        lotesSemEstoque,
      };
    } catch {
      return {
        lotesVencendo: 0,
        lotesVencendo7Dias: [],
        produtosEstoqueBaixo: 0,
        produtosEstoqueBaixoDetalhes: [],
        lotesSemEstoque: 0,
      };
    }
  },

  /**
   * Calcula a evolução do estoque nos últimos 30 dias
   */
  async getEvolucaoEstoque(): Promise<EvolucaoEstoque[]> {
    try {
      const fim = new Date();
      const inicio = new Date();
      inicio.setDate(inicio.getDate() - 30);

      // Busca movimentações dos últimos 30 dias
      const response = await api.get("/movimentacoes", {
        params: {
          dataInicio: inicio.toISOString().split("T")[0],
          dataFim: fim.toISOString().split("T")[0],
          size: 10000,
        },
      });

      const movimentacoes = response.data?.content || [];

      // Busca estoque inicial (todas as movimentações até 30 dias atrás)
      const estoqueInicialResponse = await api.get("/lotes", {
        params: { size: 1000 },
      });
      const lotes = estoqueInicialResponse.data?.content || [];

      // Calcula estoque inicial somando todas as quantidades atuais e revertendo as movimentações dos últimos 30 dias
      let estoqueInicial = lotes.reduce(
        (sum: number, lote: any) => sum + lote.quantidadeAtual,
        0
      );

      // Reverte movimentações dos últimos 30 dias para calcular estoque base
      movimentacoes.forEach((mov: any) => {
        if (mov.tipo === "ENTRADA" || mov.tipo === "AJUSTE_GANHO") {
          estoqueInicial -= mov.quantidade;
        } else {
          estoqueInicial += mov.quantidade;
        }
      });

      // Gera array com últimos 30 dias
      const dias = Array.from({ length: 30 }, (_, i) => {
        const data = new Date();
        data.setDate(data.getDate() - (29 - i));
        return data.toISOString().split("T")[0];
      });

      // Calcula estoque por dia
      const evolucao: EvolucaoEstoque[] = [];
      let estoqueAtual = estoqueInicial;

      dias.forEach((dia) => {
        const movsDia = movimentacoes.filter((m: any) =>
          m.dataHora.startsWith(dia)
        );

        const entradas = movsDia
          .filter((m: any) => m.tipo === "ENTRADA" || m.tipo === "AJUSTE_GANHO")
          .reduce((sum: number, m: any) => sum + m.quantidade, 0);

        const saidas = movsDia
          .filter((m: any) => m.tipo === "SAIDA" || m.tipo === "AJUSTE_PERDA")
          .reduce((sum: number, m: any) => sum + m.quantidade, 0);

        estoqueAtual += entradas - saidas;

        evolucao.push({
          dia: new Date(dia).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }),
          estoque: estoqueAtual,
          entradas,
          saidas,
        });
      });

      return evolucao;
    } catch {
      return [];
    }
  },

  /**
   * Busca os 5 produtos mais distribuídos (com mais saídas)
   */
  async getTop5ProdutosMaisDistribuidos(): Promise<ProdutoMaisDistribuido[]> {
    try {
      // Busca todas as movimentações de saída
      const response = await api.get("/movimentacoes", {
        params: {
          tipo: "SAIDA",
          size: 10000,
        },
      });

      const movimentacoes = response.data?.content || [];

      // Agrupa por produto e conta saídas
      const produtosMap = new Map<
        string,
        { total: number; ultimaSaida: string }
      >();

      movimentacoes.forEach((mov: any) => {
        const produtoNome =
          mov.lote?.itens?.[0]?.produtoNome ||
          mov.lote?.produtoNome ||
          "Produto Desconhecido";

        const existing = produtosMap.get(produtoNome);
        if (existing) {
          produtosMap.set(produtoNome, {
            total: existing.total + mov.quantidade,
            ultimaSaida:
              new Date(mov.dataHora) > new Date(existing.ultimaSaida)
                ? mov.dataHora
                : existing.ultimaSaida,
          });
        } else {
          produtosMap.set(produtoNome, {
            total: mov.quantidade,
            ultimaSaida: mov.dataHora,
          });
        }
      });

      // Converte para array e ordena por total de saídas
      const produtos = Array.from(produtosMap.entries())
        .map(([produtoNome, data]) => ({
          produtoNome,
          totalSaidas: data.total,
          ultimaSaida: new Date(data.ultimaSaida).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        }))
        .sort((a, b) => b.totalSaidas - a.totalSaidas)
        .slice(0, 5);

      return produtos;
    } catch {
      return [];
    }
  },
};
