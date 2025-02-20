import { useApiFetch } from "../api-hooks/use-api-fetch";
import { RegistryType } from "./types/registry.type";

export function useRegistryFindMany() {
  const { data: registries, error, isLoading } = useApiFetch<Partial<RegistryType>[]>("/registry/all");

  return { registries, error, isLoading };
}
