

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProdutoForm } from "./ProdutoForm";
import type { Produto, Categoria, ProdutoFormData } from "../types";
import { useCreateProduto, useUpdateProduto } from "../api";

interface ProdutoDialogProps {
  open: boolean;
  produto?: Produto | null;
  categorias: Categoria[];
  produtos: Produto[];
  onClose: () => void;
}

export function ProdutoDialog({
  open,
  produto,
  categorias,
  produtos,
  onClose,
}: ProdutoDialogProps) {
  const createMutation = useCreateProduto();
  const updateMutation = useUpdateProduto();

  const handleSubmit = async (data: ProdutoFormData) => {
    try {
      if (produto) {
        await updateMutation.mutateAsync({ id: produto.id, data });
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {produto ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {produto
              ? "Atualize as informações do produto."
              : "Preencha os dados para cadastrar um novo produto."}
          </DialogDescription>
        </DialogHeader>

        <ProdutoForm
          produto={produto}
          categorias={categorias}
          produtos={produtos}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
