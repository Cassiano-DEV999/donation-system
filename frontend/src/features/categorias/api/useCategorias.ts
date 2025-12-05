import { useQuery } from "@tanstack/react-query";
import { categoriaApi } from "./categoriaService";
import type { CategoriaFilters } from "../types";

export function useCategorias(filters: CategoriaFilters, page = 0, size = 10) {
  return useQuery({
    queryKey: ["categorias", filters, page, size],
    queryFn: () => categoriaApi.getAll(filters, page, size),
  });
}
