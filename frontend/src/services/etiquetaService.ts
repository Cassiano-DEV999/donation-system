import api from '@/lib/axios';

export interface EtiquetaLote {
  loteId: number;
  produtos: {
    produtoNome: string;
    quantidade: number;
    dataValidade?: string;
    tamanho?: string;
    voltagem?: string;
  }[];
  dataEntrada: string;
  quantidadeTotal: number;
  unidadeMedida: string;
  observacoes?: string;
  codigoBarras: string;
}

export const etiquetaService = {
  // Baixa etiqueta PNG com código de barras EAN13 + informações do lote
  async baixarEtiquetaLotePNG(loteId: number, tamanho: 'PEQUENO' | 'MEDIO' | 'GRANDE' = 'MEDIO'): Promise<Blob> {
    const response = await api.get(`/api/etiquetas/lote/${loteId}`, {
      params: { tamanho },
      responseType: 'blob',
    });
    return response.data;
  },
};
