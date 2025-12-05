import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loteService } from "./loteService";
import type { LoteRequest } from "../types";

export const useCreateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoteRequest) => loteService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      toast.success("Lote criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar lote: ${error.message}`);
    },
  });
};
