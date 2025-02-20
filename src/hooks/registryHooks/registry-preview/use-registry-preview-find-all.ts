
import { useApiFetch } from "@/hooks/api-hooks/use-api-fetch";
import { RegistryType } from "../types/registry.type";

export function useRegistryPreviewFindMany() {
  const { data: registries, error, isLoading } = useApiFetch<Partial<RegistryType>[]>(
    "/registry/preview/all"
  );

  return { registries, error, isLoading };
}
