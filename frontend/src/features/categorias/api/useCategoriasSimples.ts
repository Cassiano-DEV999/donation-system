import { useQuery } from "@tanstack/react-query";
import { categoriaApi } from "./categoriaService";

export function useCategoriasSimples() {
  return useQuery({
    queryKey: ["categorias-simples"],
    queryFn: () => categoriaApi.getAllSimples(),
  });
}
