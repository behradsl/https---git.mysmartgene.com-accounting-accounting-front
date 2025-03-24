import type {
  RegistryEntity,
  RegistryEntityWithFieldAccess,
} from "@/types/registry-entity.type";
import { useApiDownload, useApiMutation } from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { AxiosResponse } from "axios";
import { useState } from "react";

export function useRegistryPreviewFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading,
  } = useSwr<AxiosResponse<Partial<RegistryEntity>>>(`/registry/preview/${id}`);

  return { registry, error, isLoading };
}

export function useRegistryPreviewFindMany() {
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
    `/registry/preview/all?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
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

export function useUpdatePreviewRegistry() {
  const { trigger } = useApiMutation<RegistryEntity>(
    "post",
    "/registry/preview/update",
  );
  return { trigger };
}

export function useRegistryFinalize() {
  const { trigger } = useApiMutation<{ ids: string[] }>(
    "post",
    "/registry/preview/finalize",
  );
  return { trigger };
}

export function useRegistryPreviewExportAll() {
  const { downloadData, error, isLoading } = useApiDownload(
    "/registry/export/preview/all",
  );
  return { downloadData, error, isLoading };
}
