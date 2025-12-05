
import { useFilters } from "@/shared/hooks";
import type { ProdutoFilters } from "../types";

const initialFilters: ProdutoFilters = {
  nome: "",
  categoriaId: undefined,
};

export function useProdutoFilters() {
  return useFilters<ProdutoFilters>(initialFilters);
}
