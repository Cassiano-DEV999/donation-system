/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import type { DashboardStats } from "../types";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const [categorias, produtos, lotes, movimentacoes] = await Promise.all([
        apiClient.get("/api/categorias/simples"),
        apiClient.get("/api/produtos/simples"),
        apiClient.get("/api/lotes/simples"),
        apiClient.get("/api/movimentacoes/simples"),
      ]);

      const estoqueTotal = (lotes.data || []).reduce(
        (sum: number, lote: any) => sum + (lote.quantidadeAtual || 0),
        0
      );

      return {
        totalCategorias: categorias.data?.length || 0,
        totalProdutos: produtos.data?.length || 0,
        totalLotes: lotes.data?.length || 0,
        totalMovimentacoes: movimentacoes.data?.length || 0,
        estoqueTotal,
      };
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
