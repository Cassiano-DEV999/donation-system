import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoriaForm } from "./CategoriaForm";
import type { Categoria, CategoriaFormData } from "../types";
import { useCreateCategoria, useUpdateCategoria } from "../api";

interface CategoriaDialogProps {
  open: boolean;
  categoria?: Categoria | null;
  onClose: () => void;
}

export function CategoriaDialog({
  open,
  categoria,
  onClose,
}: CategoriaDialogProps) {
  const createMutation = useCreateCategoria();
  const updateMutation = useUpdateCategoria();

  const handleSubmit = async (data: CategoriaFormData) => {
    try {
      if (categoria) {
        await updateMutation.mutateAsync({ id: categoria.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onClose();
    } catch {
      // Erro já tratado pelos hooks
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {categoria ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <DialogDescription>
            {categoria
              ? "Atualize as informações da categoria."
              : "Preencha os dados para cadastrar uma nova categoria."}
          </DialogDescription>
        </DialogHeader>

        <CategoriaForm
          categoria={categoria}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
