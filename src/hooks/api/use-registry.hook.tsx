import type {
  RegistryEntity,
  RegistryEntityWithFieldAccess,
  RegistryFieldAccessType,
} from "@/types/registry-entity.type";
import {
  useApiDownload,
  useApiMutation,
  useApiUpload,
} from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { AxiosResponse } from "axios";

export function useCreateRegistry() {
  const { trigger } = useApiMutation<Omit<RegistryEntity, "id">>(
    "post",
    "/registry/create"
  );
  return { trigger };
}
export function useUpdateRegistry() {
  const { trigger } = useApiMutation<RegistryEntity>(
    "post",
    "/registry/update"
  );
  return {trigger};
}
export function useRegistryFindMany() {
  const {
    data: registries,
    error,
    isLoading,
    mutate,
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>[]>>(
    "/registry/all"
  );

  return { registries, error, isLoading, mutate };
}

export function useRegistryFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>>>(
    `/registry/${id}`
  );

  return { registry, error, isLoading };
}

export function useRegistryFieldAccessFindMany() {
  const {
    data: fieldAccesses,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryFieldAccessType>[]>>(
    "setting/registry/access/all"
  );

  return { fieldAccesses, error, isLoading };
}
export function useRegistryUpsertFieldAccess() {
  const { trigger } = useApiMutation<Omit<RegistryFieldAccessType, "id">>(
    "post",
    "setting/registry/access/assign"
  );
  return trigger;
}

export function useRegistryImportXlsx() {
  return useApiUpload("/registry/import/file/upload");
}

export function useRegistryExportEmpty() {
  return useApiDownload("/registry/export/empty");
}
