import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usuarioService } from "./usuarioService";

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usuarioService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("Usuário excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir usuário: ${error.message}`);
    },
  });
};
