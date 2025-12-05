import { useQuery } from "@tanstack/react-query";
import { loteService } from "./loteService";

export const useLote = (id: number | null) => {
  return useQuery({
    queryKey: ["lotes", id],
    queryFn: () => loteService.getById(id!),
    enabled: !!id,
  });
};
