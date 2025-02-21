import type { RegistryEntity } from "@/types/registry-entity.type";
import { useApiDownload, useApiMutation } from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { AxiosResponse } from "axios";

export function useRegistryPreviewFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading,
  } = useSwr<Partial<RegistryEntity>>(`/registry/preview/${id}`);

  return { registry, error, isLoading };
}

export function useRegistryPreviewFindMany() {
  const {
    data: registries,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryEntity>[]>>("/registry/preview/all");

  return { registries, error, isLoading };
}

export function useUpdatePreviewRegistry(newRegistry: RegistryEntity) {
  const { trigger } = useApiMutation<RegistryEntity>(
    "post",
    "/registry/preview/update",
    newRegistry,
  );
  return trigger;
}

export function useRegistryFinalize(id: string) {
  const { trigger } = useApiMutation<string>(
    "post",
    "/registry/preview/finalize",
    id,
  );
  return trigger;
}

export function useRegistryPreviewExportAll() {
  const { data, error, isLoading } = useApiDownload(
    "/registry/preview/export/all",
  );
  return { data, error, isLoading };
}
