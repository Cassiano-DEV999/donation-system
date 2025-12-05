import { useQuery } from "@tanstack/react-query";
import type { PaginationParams } from "@/shared/types";
import { movimentacaoService } from "./movimentacaoService";
import type { MovimentacaoFilters } from "../types";

export const useMovimentacoes = (
  filters: MovimentacaoFilters,
  pagination: PaginationParams
) => {
  return useQuery({
    queryKey: ["movimentacoes", filters, pagination],
    queryFn: () => movimentacaoService.getAll(filters, pagination),
  });
};
