import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriaApi } from "./categoriaService";
import type { CategoriaFormData } from "../types";

interface UpdateCategoriaParams {
  id: number;
  data: CategoriaFormData;
}

export function useUpdateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoriaParams) =>
      categoriaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      queryClient.invalidateQueries({ queryKey: ["categorias-simples"] });
      toast.success("Categoria atualizada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar categoria");
    },
  });
}
