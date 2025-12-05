import { useState } from "react";
import type { LoteResponse } from "../types";

export const useLoteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingLote, setEditingLote] = useState<LoteResponse | null>(null);

  const openCreate = () => {
    setEditingLote(null);
    setIsOpen(true);
  };

  const openEdit = (lote: LoteResponse) => {
    setEditingLote(lote);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingLote(null);
  };

  return {
    isOpen,
    editingLote,
    openCreate,
    openEdit,
    close,
  };
};
