import api from '@/lib/axios';

export type UnidadeMedida = 'UNIDADE' | 'QUILOGRAMA' | 'LITRO' | 'PACOTE' | 'CAIXA';

export interface LoteItem {
  id?: number;
  produtoId: number;
  produtoNome?: string;
  quantidade: number;
  dataValidade?: string;
  tamanho?: string;
  voltagem?: string;
}

export interface Lote {
  [x: string]: any;
  dataValidade: any;
  tamanho: any;
  voltagem: any;
  produtoNome: ReactNode;
  id: number;
  itens: LoteItem[];
  quantidadeInicial: number;
  quantidadeAtual: number;
  dataEntrada: string;
  unidadeMedida: UnidadeMedida;
  observacoes?: string;
  codigoBarras?: string;
}

export const loteService = {
  async getAll(queryString?: string): Promise<Lote[]> {
    const response = await api.get(`/api/lotes${queryString || ''}`);
    return response.data;
  },

  async getById(id: number): Promise<Lote> {
    const response = await api.get(`/api/lotes/${id}`);
    return response.data;
  },

  async create(data: Omit<Lote, 'id' | 'codigoBarras' | 'quantidadeInicial' | 'quantidadeAtual'>): Promise<Lote> {
    const response = await api.post('/api/lotes', data);
    return response.data;
  },

  async update(id: number, data: Omit<Lote, 'id' | 'codigoBarras' | 'quantidadeInicial' | 'quantidadeAtual'>): Promise<Lote> {
    const response = await api.put(`/api/lotes/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/lotes/${id}`);
  },

  async atualizarQuantidade(id: number, ajuste: number): Promise<Lote> {
    const response = await api.patch(`/api/lotes/${id}/quantidade`, { ajuste });
    return response.data;
  },

  async buscarProximosVencimento(dias: number): Promise<Lote[]> {
    const response = await api.get(`/api/lotes/vencimento?dias=${dias}`);
    return response.data;
  },
};
