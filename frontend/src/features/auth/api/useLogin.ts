
import { useMutation } from "@tanstack/react-query";
import api from "@/shared/api/client";
import type { LoginRequest, LoginResponse } from "../types";

async function loginFn(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginFn,
  });
}
