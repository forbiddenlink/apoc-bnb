import { useQuery } from "@tanstack/react-query";
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
