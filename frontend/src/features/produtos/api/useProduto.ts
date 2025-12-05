

import { useQuery } from "@tanstack/react-query";
import { produtoApi } from "./produtoService";

export function useProduto(id: number, enabled = true) {
  return useQuery({
    queryKey: ["produto", id],
    queryFn: () => produtoApi.getById(id),
    enabled: enabled && id > 0,
  });
}
