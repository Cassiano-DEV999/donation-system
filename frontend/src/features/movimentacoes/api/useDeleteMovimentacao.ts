import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { movimentacaoService } from "./movimentacaoService";

export const useDeleteMovimentacao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => movimentacaoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      toast.success("Movimentação excluída com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir movimentação: ${error.message}`);
    },
  });
};
