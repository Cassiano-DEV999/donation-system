

import api from "@/shared/api/client";
import type { Page } from "@/shared/types";
import type { Categoria, CategoriaFormData, CategoriaFilters } from "../types";

export const categoriaApi = {
  async getAll(
    filters: CategoriaFilters,
    page = 0,
    size = 10
  ): Promise<Page<Categoria>> {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());

    if (filters.nome) {
      params.append("nome", filters.nome);
    }

    const response = await api.get(`/api/categorias?${params.toString()}`);
    return response.data;
  },

  async getAllSimples(): Promise<Categoria[]> {
    const response = await api.get("/api/categorias/simples");
    return response.data;
  },

  async getById(id: number): Promise<Categoria> {
    const response = await api.get(`/api/categorias/${id}`);
    return response.data;
  },

  async create(data: CategoriaFormData): Promise<Categoria> {
    const response = await api.post("/api/categorias", data);
    return response.data;
  },

  async update(id: number, data: CategoriaFormData): Promise<Categoria> {
    const response = await api.put(`/api/categorias/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/categorias/${id}`);
  },
};
