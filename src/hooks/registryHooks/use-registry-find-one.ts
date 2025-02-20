import { useApiFetch } from "../api-hooks/use-api-fetch";
import { RegistryType } from "./types/registry.type";

export function useRegistryFindOne(id: string) {
  const { data: registry, error, isLoading } = useApiFetch<Partial<RegistryType>>(`/registry/${id}`);

  return { registry, error, isLoading };
}
