import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loteService } from "./loteService";
import type { LoteRequest } from "../types";

export const useUpdateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LoteRequest }) =>
      loteService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      toast.success("Lote atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar lote: ${error.message}`);
    },
  });
};
