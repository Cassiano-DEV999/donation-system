import { useState } from "react";
import { useDisclosure } from "@/shared/hooks";
import type { Categoria } from "../types";

export function useCategoriaDialog() {
  const { isOpen, open, close } = useDisclosure();
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(
    null
  );

  const openCreate = () => {
    setEditingCategoria(null);
    open();
  };

  const openEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    open();
  };

  const handleClose = () => {
    setEditingCategoria(null);
    close();
  };

  return {
    isOpen,
    editingCategoria,
    openCreate,
    openEdit,
    close: handleClose,
  };
}
