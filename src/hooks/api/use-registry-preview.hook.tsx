import type { RegistryEntity, RegistryEntityWithFieldAccess } from "@/types/registry-entity.type";
import { useApiDownload, useApiMutation } from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { AxiosResponse } from "axios";

export function useRegistryPreviewFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>>>(`/registry/preview/${id}`);

  return { registry, error, isLoading };
}

export function useRegistryPreviewFindMany() {
  const {
    data: registries,
    error,
    isLoading,
    mutate,
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>[]>>("/registry/preview/all");

  return { registries, error, isLoading ,mutate };
}

export function useUpdatePreviewRegistry() {
  const { trigger } = useApiMutation<RegistryEntity>(
    "post",
    "/registry/preview/update"
  );
  return {trigger};
}

export function useRegistryFinalize() {
  const { trigger } = useApiMutation<Pick<RegistryEntity, "id">>(
    "post",
    "/registry/preview/finalize"
  );
  return { trigger };
}

export function useRegistryPreviewExportAll() {
  const { data, error, isLoading } = useApiDownload(
    "/registry/preview/export/all"
  );
  return { data, error, isLoading };
}
