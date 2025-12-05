import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { movimentacaoService } from "./movimentacaoService";
import type { MontagemKitRequest } from "../types";

export const useMontarKit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MontagemKitRequest) =>
      movimentacaoService.montarKit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      toast.success("Kit montado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao montar kit: ${error.message}`);
    },
  });
};
