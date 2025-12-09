import { apiClient } from "@/shared/api/client";
import type { Page, PaginationParams } from "@/shared/types";
import type { UsuarioRequest, UsuarioResponse, UsuarioFilters } from "../types";

export const usuarioService = {
  getAll: async (
    filters: UsuarioFilters,
    pagination: PaginationParams
  ): Promise<Page<UsuarioResponse>> => {
    const params = new URLSearchParams();

    if (filters.nome) params.append("nome", filters.nome);
    if (filters.perfil) params.append("perfil", filters.perfil);

    params.append("page", (pagination.page ?? 0).toString());
    params.append("size", (pagination.size ?? 10).toString());

    const response = await apiClient.get<Page<UsuarioResponse>>(
      `/api/usuarios?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<UsuarioResponse> => {
    const response = await apiClient.get<UsuarioResponse>(
      `/api/usuarios/${id}`
    );
    return response.data;
  },

  getByEmail: async (email: string): Promise<UsuarioResponse> => {
    const response = await apiClient.get<UsuarioResponse>(
      `/api/usuarios/email/${email}`
    );
    return response.data;
  },

  create: async (data: UsuarioRequest): Promise<UsuarioResponse> => {
    const response = await apiClient.post<UsuarioResponse>(
      "/api/usuarios",
      data
    );
    return response.data;
  },

  update: async (
    id: number,
    data: UsuarioRequest
  ): Promise<UsuarioResponse> => {
    const response = await apiClient.put<UsuarioResponse>(
      `/api/usuarios/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/usuarios/${id}`);
  },
};
