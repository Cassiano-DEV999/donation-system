import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UsuarioForm } from "./UsuarioForm";
import { useCreateUsuario, useUpdateUsuario } from "../api";
import type { UsuarioResponse, UsuarioRequest } from "../types";

interface UsuarioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingUsuario: UsuarioResponse | null;
}

export function UsuarioDialog({
  isOpen,
  onClose,
  editingUsuario,
}: UsuarioDialogProps) {
  const createMutation = useCreateUsuario();
  const updateMutation = useUpdateUsuario();

  const handleSubmit = async (data: UsuarioRequest) => {
    if (editingUsuario) {
      await updateMutation.mutateAsync({ id: editingUsuario.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingUsuario ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
          <DialogDescription>
            {editingUsuario
              ? "Atualize as informações do usuário"
              : "Preencha os dados para criar um novo usuário"}
          </DialogDescription>
        </DialogHeader>
        <UsuarioForm
          initialData={editingUsuario || undefined}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
