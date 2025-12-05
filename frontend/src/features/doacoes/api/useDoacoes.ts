import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { doacaoService } from "./doacaoService";
import type { EntradaDoacaoRequest } from "../types";

export function useRegistrarDoacao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EntradaDoacaoRequest) =>
      doacaoService.registrarEntradaRapida(data),
    onSuccess: (loteIds) => {
      toast.success(
        `Doação registrada com sucesso! ${loteIds.length} lote(s) criado(s).`
      );
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Erro ao registrar doação";
      toast.error(message);
    },
  });
}
