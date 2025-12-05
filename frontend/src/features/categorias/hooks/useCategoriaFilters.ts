import { useFilters } from "@/shared/hooks";
import type { CategoriaFilters } from "../types";

const initialFilters: CategoriaFilters = {
  nome: "",
};

export function useCategoriaFilters() {
  return useFilters<CategoriaFilters>(initialFilters);
}
