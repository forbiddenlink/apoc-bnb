import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchBunker } from "@/lib/api/bunkers";
import { bunkerKeys } from "./useBunkers";

interface UseBunkerOptions {
  enabled?: boolean;
}

export function useBunker(id: string, options: UseBunkerOptions = {}) {
  const query = useQuery({
    queryKey: bunkerKeys.detail(id),
    queryFn: () => fetchBunker(id),
    enabled: options.enabled !== false && !!id,
  });

  return {
    bunker: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to prefetch bunker details on hover for instant navigation
 */
export function usePrefetchBunker() {
  const queryClient = useQueryClient();

  const prefetch = useCallback(
    (id: string) => {
      queryClient.prefetchQuery({
        queryKey: bunkerKeys.detail(id),
        queryFn: () => fetchBunker(id),
        staleTime: 60 * 1000, // Consider fresh for 60s
      });
    },
    [queryClient]
  );

  return prefetch;
}
