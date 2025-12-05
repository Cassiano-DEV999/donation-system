

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { produtoApi } from "./produtoService";
import type { ProdutoFormData } from "../types";

interface UpdateProdutoParams {
  id: number;
  data: ProdutoFormData;
}

export function useUpdateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProdutoParams) =>
      produtoApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      queryClient.invalidateQueries({ queryKey: ["produto", variables.id] });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao atualizar produto");
    },
  });
}
