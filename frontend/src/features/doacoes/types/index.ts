export type UnidadeMedida =
  | "UNIDADE"
  | "QUILOGRAMA"
  | "LITRO"
  | "PACOTE"
  | "CAIXA";

export interface ItemDoacaoRequest {
  produtoId: number;
  quantidade: number;
  validade?: string;
  tamanho?: string;
  voltagem?: string;
  observacoesItem?: string;
  unidadeMedida?: UnidadeMedida;
}

export interface EntradaDoacaoRequest {
  itens: ItemDoacaoRequest[];
  dataEntrada: string;
  observacoesGerais?: string;
}

export interface EntradaDoacaoResponse {
  loteIds: number[];
}
