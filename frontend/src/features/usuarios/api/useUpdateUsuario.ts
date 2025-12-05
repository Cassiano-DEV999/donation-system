import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usuarioService } from "./usuarioService";
import type { UsuarioRequest } from "../types";

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UsuarioRequest }) =>
      usuarioService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("Usuário atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar usuário: ${error.message}`);
    },
  });
};
