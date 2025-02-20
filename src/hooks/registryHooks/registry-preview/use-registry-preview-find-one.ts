
import { useApiFetch } from "@/hooks/api-hooks/use-api-fetch";
import { RegistryType } from "../types/registry.type";

export function useRegistryPreviewFindOne(id: string) {
  const { data: registry, error, isLoading } = useApiFetch<Partial<RegistryType>>(
    `/registry/preview/${id}`
  );

  return { registry, error, isLoading };
}
