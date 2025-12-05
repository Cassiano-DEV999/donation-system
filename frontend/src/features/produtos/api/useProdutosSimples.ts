import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import type { ProdutoSimples } from "../types";

export const useProdutosSimples = () => {
  return useQuery({
    queryKey: ["produtos-simples"],
    queryFn: async () => {
      const response = await apiClient.get<ProdutoSimples[]>(
        "/api/produtos/simples"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
