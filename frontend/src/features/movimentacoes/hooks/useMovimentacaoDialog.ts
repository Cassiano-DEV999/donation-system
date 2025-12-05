import { useState } from "react";
import type { MovimentacaoResponse } from "../types";

export const useMovimentacaoDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingMovimentacao, setEditingMovimentacao] =
    useState<MovimentacaoResponse | null>(null);

  const openCreate = () => {
    setEditingMovimentacao(null);
    setIsOpen(true);
  };

  const openEdit = (movimentacao: MovimentacaoResponse) => {
    setEditingMovimentacao(movimentacao);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingMovimentacao(null);
  };

  return {
    isOpen,
    editingMovimentacao,
    openCreate,
    openEdit,
    close,
  };
};
