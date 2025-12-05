
export {
  useProdutos,
  useProduto,
  useCreateProduto,
  useUpdateProduto,
  useDeleteProduto,
  produtoApi,
} from "./api";

export {
  ProdutoTable,
  ProdutoFiltersComponent,
  ProdutoForm,
  ProdutoDialog,
} from "./components";

export { useProdutoFilters, useProdutoDialog } from "./hooks";

export type {
  Produto,
  Categoria,
  Componente,
  ProdutoFormData,
  ProdutoFilters,
} from "./types";
