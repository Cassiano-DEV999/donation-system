import { useQuery } from "@tanstack/react-query";
import { usuarioService } from "./usuarioService";

export const useUsuario = (id: number | null) => {
  return useQuery({
    queryKey: ["usuarios", id],
    queryFn: () => usuarioService.getById(id!),
    enabled: !!id,
  });
};
