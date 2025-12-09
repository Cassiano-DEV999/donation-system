

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que os dados permanecem "fresh" (não refaz requisição)
      staleTime: 1000 * 60 * 5, // 5 minutos

      // Tempo que os dados ficam no cache
      gcTime: 1000 * 60 * 10, // 10 minutos (antes era cacheTime)

      // Não refetch automático ao focar na janela
      refetchOnWindowFocus: false,

      // Retry em caso de erro
      retry: 1,

      // Mantém dados anteriores durante refetch
      placeholderData: (prev: unknown) => prev,
    },
    mutations: {
      // Configurações para mutations (create, update, delete)
      retry: false,
    },
  },
});
