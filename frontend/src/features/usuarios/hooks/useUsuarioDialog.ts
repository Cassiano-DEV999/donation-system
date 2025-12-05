import { useState } from "react";
import type { UsuarioResponse } from "../types";

export const useUsuarioDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<UsuarioResponse | null>(
    null
  );

  const openCreate = () => {
    setEditingUsuario(null);
    setIsOpen(true);
  };

  const openEdit = (usuario: UsuarioResponse) => {
    setEditingUsuario(usuario);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingUsuario(null);
  };

  return {
    isOpen,
    editingUsuario,
    openCreate,
    openEdit,
    close,
  };
};
