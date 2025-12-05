

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { produtoApi } from "./produtoService";
import type { ProdutoFormData } from "../types";

export function useCreateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProdutoFormData) => produtoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.success("Produto criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar produto");
    },
  });
}
