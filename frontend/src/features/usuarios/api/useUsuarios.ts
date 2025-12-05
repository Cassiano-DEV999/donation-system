import { useQuery } from "@tanstack/react-query";
import type { PaginationParams } from "@/shared/types";
import { usuarioService } from "./usuarioService";
import type { UsuarioFilters } from "../types";

export const useUsuarios = (
  filters: UsuarioFilters,
  pagination: PaginationParams
) => {
  return useQuery({
    queryKey: ["usuarios", filters, pagination],
    queryFn: () => usuarioService.getAll(filters, pagination),
  });
};
