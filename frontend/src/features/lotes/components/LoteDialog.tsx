import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoteForm } from "./LoteForm";
import { useCreateLote, useUpdateLote } from "../api";
import type { LoteResponse, LoteRequest } from "../types";

interface LoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingLote: LoteResponse | null;
}

export function LoteDialog({ isOpen, onClose, editingLote }: LoteDialogProps) {
  const createMutation = useCreateLote();
  const updateMutation = useUpdateLote();

  const handleSubmit = async (data: LoteRequest) => {
    if (editingLote) {
      await updateMutation.mutateAsync({ id: editingLote.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingLote ? "Editar Lote" : "Novo Lote"}</DialogTitle>
          <DialogDescription>
            {editingLote
              ? "Atualize as informações do lote"
              : "Preencha os dados para criar um novo lote"}
          </DialogDescription>
        </DialogHeader>
        <LoteForm
          initialData={editingLote || undefined}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
