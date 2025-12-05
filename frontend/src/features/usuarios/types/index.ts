export type PerfilUsuario = "ADMIN" | "VOLUNTARIO";

export interface UsuarioRequest {
  nome: string;
  email: string;
  senha?: string;
  perfil: PerfilUsuario;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
}

export interface UsuarioSimples {
  id: number;
  nome: string;
}

export interface UsuarioFilters {
  nome?: string;
  perfil?: PerfilUsuario;
}
