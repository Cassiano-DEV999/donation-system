import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loteService } from "./loteService";

export const useDeleteLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => loteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lotes"] });
      toast.success("Lote excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir lote: ${error.message}`);
    },
  });
};
