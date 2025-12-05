

export {
  useCategorias,
  useCategoriasSimples,
  useCreateCategoria,
  useUpdateCategoria,
  useDeleteCategoria,
  categoriaApi,
} from "./api";

export {
  CategoriaTable,
  CategoriaFiltersComponent,
  CategoriaForm,
  CategoriaDialog,
} from "./components";

export { useCategoriaFilters, useCategoriaDialog } from "./hooks";

export type { Categoria, CategoriaFormData, CategoriaFilters } from "./types";
