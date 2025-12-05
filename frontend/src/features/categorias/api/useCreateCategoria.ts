import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriaApi } from "./categoriaService";
import type { CategoriaFormData } from "../types";

export function useCreateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoriaFormData) => categoriaApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      queryClient.invalidateQueries({ queryKey: ["categorias-simples"] });
      toast.success("Categoria criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar categoria");
    },
  });
}
