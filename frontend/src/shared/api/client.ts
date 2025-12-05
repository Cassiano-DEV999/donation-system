

import axios, { AxiosError } from "axios";
import type { ApiError } from "@/shared/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Token expirado ou inválido
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redireciona para login apenas se não estiver na página de login
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Formata erro para padrão da aplicação
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "Erro desconhecido",
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  }
);

export const apiClient = api;
export default api;
