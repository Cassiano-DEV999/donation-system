export interface DashboardStats {
  totalCategorias: number;
  totalProdutos: number;
  totalLotes: number;
  totalMovimentacoes: number;
  estoqueTotal: number;
}

export interface MovimentacaoPorDia {
  data: string;
  quantidade: number;
}

export interface EstoquePorCategoria {
  categoria: string;
  quantidade: number;
}
