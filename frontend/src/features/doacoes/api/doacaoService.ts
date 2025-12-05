import { apiClient } from "@/shared/api/client";
import type { EntradaDoacaoRequest } from "../types";

export const doacaoService = {
  registrarEntradaRapida: async (
    data: EntradaDoacaoRequest
  ): Promise<number[]> => {
    const response = await apiClient.post<number[]>(
      "/api/doacoes/entrada-rapida",
      data
    );
    return response.data;
  },
};
