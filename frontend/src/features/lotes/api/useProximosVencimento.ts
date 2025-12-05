import { useQuery } from "@tanstack/react-query";
import { loteService } from "./loteService";

export const useProximosVencimento = (dias: number) => {
  return useQuery({
    queryKey: ["lotes-vencimento", dias],
    queryFn: () => loteService.getProximosVencimento(dias),
    enabled: dias > 0,
  });
};
