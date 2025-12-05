import { useQuery } from "@tanstack/react-query";
import type { PaginationParams } from "@/shared/types";
import { loteService } from "./loteService";
import type { LoteFilters } from "../types";

export const useLotes = (
  filters: LoteFilters,
  pagination: PaginationParams
) => {
  return useQuery({
    queryKey: ["lotes", filters, pagination],
    queryFn: () => loteService.getAll(filters, pagination),
  });
};
