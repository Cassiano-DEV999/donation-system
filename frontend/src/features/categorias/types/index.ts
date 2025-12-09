

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  icone?: string;
}

export interface CategoriaFormData {
  nome: string;
  descricao?: string;
  icone?: string;
}

export interface CategoriaFilters {
  nome?: string;
  [key: string]: unknown;
}
