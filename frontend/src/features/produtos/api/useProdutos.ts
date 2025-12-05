

import { useQuery } from "@tanstack/react-query";
import { produtoApi } from "./produtoService";
import type { ProdutoFilters } from "../types";

export function useProdutos(filters: ProdutoFilters, page = 0, size = 10) {
  return useQuery({
    queryKey: ["produtos", filters, page, size],
    queryFn: () => produtoApi.getAll(filters, page, size),
  });
}
