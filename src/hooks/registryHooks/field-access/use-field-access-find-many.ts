import { useApiFetch } from "@/hooks/api-hooks/use-api-fetch";
import { RegistryFieldAccessType } from "../types/registry.type";

export function useFieldAccessFindMany() {
  const {
    data: fieldAccesses,
    error,
    isLoading,
  } = useApiFetch<Partial<RegistryFieldAccessType>[]>(
    "setting/registry/access/all"
  );

  return { fieldAccesses, error, isLoading };
}
