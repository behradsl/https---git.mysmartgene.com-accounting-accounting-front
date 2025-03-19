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
import { UserPosition } from "@/types/user-entity.type";
import { useState } from "react";

export function useCreateRegistry() {
  const { trigger } = useApiMutation<Omit<RegistryEntity, "id">>(
    "post",
    "/registry/create",
  );
  return { trigger };
}
export function useUpdateRegistry() {
  const { trigger } = useApiMutation<RegistryEntity>(
    "post",
    "/registry/update",
  );
  return { trigger };
}
export function useDeleteRegistry() {
  const { trigger } = useApiMutation<{ ids: string[] }>(
    "post",
    "/registry/delete",
  );
  return { trigger };
}
export function useRegistryFindMany() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortBy, setSortBy] = useState<{
    direction: "asc" | "desc";
    columnId: string;
  }>({ columnId: "createdAt", direction: "desc" });

  const {
    data: registries,
    error,
    isLoading,
    mutate,
  } = useSwr<
    AxiosResponse<{
      registries: Partial<RegistryEntityWithFieldAccess>[];
      totalCount: number;
    }>
  >(
    `/registry/all?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
  );

  return {
    registries,
    error,
    isLoading,
    mutate,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
  };
}

export function useRegistryFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>>>(
    `/registry/${id}`,
  );

  return { registry, error, isLoading };
}

export function useRegistryFieldAccessFindMany() {
  const {
    data: fieldAccesses,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryFieldAccessType>[]>>(
    "setting/registry/access/all",
  );

  return { fieldAccesses, error, isLoading };
}

export function useRegistryFieldAccessFindByPosition(position: string) {
  const {
    data: fieldAccesses,
    error,
    isLoading,
  } = useSwr<AxiosResponse<RegistryFieldAccessType[]>>(
    `setting/registry/access/find/${position}`,
  );

  return { fieldAccesses, error, isLoading };
}

export function useRegistryUpsertFieldAccess() {
  const { trigger } = useApiMutation<Omit<RegistryFieldAccessType, "id">[]>(
    "post",
    "setting/registry/access/assign",
  );
  return { trigger };
}

export function useRegistryRoleFieldAccess(position: UserPosition) {
  const {
    data: fieldAccesses,
    error,
    isLoading,
  } = useSwr<AxiosResponse<string[]>>(
    `setting/registry/access/find/visibleFields/${position}`,
  );
  return { fieldAccesses, error, isLoading };
}

export function useRegistryImportXlsx() {
  return useApiUpload("/registry/import/file/upload");
}

export function useRegistryExportEmpty() {
  return useApiDownload("/registry/export/empty", "get");
}

export function useRegistryExportAll() {
  const { downloadData, error, isLoading } = useApiDownload(
    "/registry/export/all",
  );
  return { downloadData, error, isLoading };
}
