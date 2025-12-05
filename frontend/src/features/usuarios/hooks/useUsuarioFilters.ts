import { useState } from "react";
import type { UsuarioFilters } from "../types";

export const useUsuarioFilters = () => {
  const [filters, setFilters] = useState<UsuarioFilters>({});
  const [tempFilters, setTempFilters] = useState<UsuarioFilters>({});

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const resetFilters = () => {
    setTempFilters({});
    setFilters({});
  };

  const clearFilter = (key: keyof UsuarioFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    setTempFilters(newFilters);
  };

  return {
    filters,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    clearFilter,
  };
};
