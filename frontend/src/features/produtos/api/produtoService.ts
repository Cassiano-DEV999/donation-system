

import api from "@/shared/api/client";
import type { Page } from "@/shared/types";
import type { Produto, ProdutoFormData, ProdutoFilters } from "../types";

export const produtoApi = {
  
  async getAll(
    filters: ProdutoFilters,
    page = 0,
    size = 10
  ): Promise<Page<Produto>> {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());

    if (filters.nome) {
      params.append("nome", filters.nome);
    }
    if (filters.categoriaId) {
      params.append("categoriaId", filters.categoriaId.toString());
    }

    const response = await api.get(`/api/produtos?${params.toString()}`);
    return response.data;
  },

  
  async getById(id: number): Promise<Produto> {
    const response = await api.get(`/api/produtos/${id}`);
    return response.data;
  },

 
  async create(data: ProdutoFormData): Promise<Produto> {
    const response = await api.post("/api/produtos", data);
    return response.data;
  },

  
  async update(id: number, data: ProdutoFormData): Promise<Produto> {
    const response = await api.put(`/api/produtos/${id}`, data);
    return response.data;
  },

  
  async delete(id: number): Promise<void> {
    await api.delete(`/api/produtos/${id}`);
  },

 
  async getByCategoria(categoriaId: number): Promise<Produto[]> {
    const response = await api.get(`/api/produtos/categoria/${categoriaId}`);
    return response.data;
  },
};
