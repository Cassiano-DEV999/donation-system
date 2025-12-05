import { useQuery } from "@tanstack/react-query";
import { movimentacaoService } from "./movimentacaoService";

export const useMovimentacao = (id: number | null) => {
  return useQuery({
    queryKey: ["movimentacoes", id],
    queryFn: () => movimentacaoService.getById(id!),
    enabled: !!id,
  });
};
