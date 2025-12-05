import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriaApi } from "./categoriaService";

export function useDeleteCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriaApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      queryClient.invalidateQueries({ queryKey: ["categorias-simples"] });
      toast.success("Categoria deletada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao deletar categoria");
    },
  });
}
