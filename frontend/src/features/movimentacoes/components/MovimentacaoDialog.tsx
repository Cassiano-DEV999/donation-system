import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MovimentacaoForm } from "./MovimentacaoForm";
import { useCreateMovimentacao } from "../api";
import type { MovimentacaoRequest } from "../types";

interface MovimentacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MovimentacaoDialog({
  isOpen,
  onClose,
}: MovimentacaoDialogProps) {
  const createMutation = useCreateMovimentacao();

  const handleSubmit = async (data: MovimentacaoRequest) => {
    await createMutation.mutateAsync(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Movimentação</DialogTitle>
          <DialogDescription>
            Registre uma movimentação de estoque
          </DialogDescription>
        </DialogHeader>
        <MovimentacaoForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
