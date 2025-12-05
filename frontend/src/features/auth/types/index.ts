
import type { PerfilUsuario } from "@/shared/types";

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
}

export interface RegisterResponse {
  token: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  register: (
    nome: string,
    email: string,
    senha: string,
    perfil: PerfilUsuario
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
