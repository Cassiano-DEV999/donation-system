
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
}

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

export type PerfilUsuario = "ADMIN" | "VOLUNTARIO";

export type Status = "active" | "inactive" | "pending";
