
import { useState } from "react";
import { useDisclosure } from "@/shared/hooks";
import type { Produto } from "../types";

export function useProdutoDialog() {
  const { isOpen, open, close } = useDisclosure();
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

  const openCreate = () => {
    setEditingProduto(null);
    open();
  };

  const openEdit = (produto: Produto) => {
    setEditingProduto(produto);
    open();
  };

  const handleClose = () => {
    setEditingProduto(null);
    close();
  };

  return {
    isOpen,
    editingProduto,
    openCreate,
    openEdit,
    close: handleClose,
  };
}
