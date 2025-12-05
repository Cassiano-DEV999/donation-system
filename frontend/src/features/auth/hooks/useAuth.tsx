

import { useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import type { User } from "../types";
import { useLoginMutation, useRegisterMutation } from "../api";
import { AuthContext } from "./authContext";


function decodeToken(token: string): User | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return {
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.sub,
      perfil: decoded.perfil,
    };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  // Carrega token do localStorage na inicialização
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const decodedUser = decodeToken(storedToken);
          if (decodedUser) {
            setToken(storedToken);
            setUser(decodedUser);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Erro ao processar token:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await loginMutation.mutateAsync({ email, senha });
      const { token: newToken } = response;

      const decodedUser = decodeToken(newToken);
      if (decodedUser) {
        setToken(newToken);
        setUser(decodedUser);
        localStorage.setItem("token", newToken);
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      const message = (error as Error).message || "Erro ao fazer login";
      toast.error(message);
      throw error;
    }
  };

  const register = async (
    nome: string,
    email: string,
    senha: string,
    perfil: "ADMIN" | "VOLUNTARIO"
  ) => {
    try {
      await registerMutation.mutateAsync({ nome, email, senha, perfil });
      await login(email, senha);
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      const message = (error as Error).message || "Erro ao fazer cadastro";
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    toast.info("Você saiu da aplicação");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
