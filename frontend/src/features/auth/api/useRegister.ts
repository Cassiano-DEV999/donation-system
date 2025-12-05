

import { useMutation } from "@tanstack/react-query";
import api from "@/shared/api/client";
import type { RegisterRequest, RegisterResponse } from "../types";

async function registerFn(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await api.post("/api/auth/register", data);
  return response.data;
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerFn,
  });
}
