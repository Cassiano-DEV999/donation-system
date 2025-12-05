import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usuarioService } from "./usuarioService";
import type { UsuarioRequest } from "../types";

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UsuarioRequest) => usuarioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("Usuário criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar usuário: ${error.message}`);
    },
  });
};
