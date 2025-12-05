

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { produtoApi } from "./produtoService";

export function useDeleteProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => produtoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.success("Produto deletado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao deletar produto");
    },
  });
}
