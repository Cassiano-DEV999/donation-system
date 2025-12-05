import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";

export interface LoteSimples {
  id: number;
  descricaoProdutos: string;
  quantidadeAtual: number;
  codigoBarras?: string;
}

export const useLotesSimples = () => {
  return useQuery({
    queryKey: ["lotes-simples"],
    queryFn: async () => {
      const response = await apiClient.get<LoteSimples[]>("/api/lotes/simples");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
