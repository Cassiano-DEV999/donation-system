import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { movimentacaoService } from "./movimentacaoService";
import type { MovimentacaoRequest } from "../types";

export const useCreateMovimentacao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MovimentacaoRequest) => movimentacaoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      toast.success("Movimentação criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar movimentação: ${error.message}`);
    },
  });
};
