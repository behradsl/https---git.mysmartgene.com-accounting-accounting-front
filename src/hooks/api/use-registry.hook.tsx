import type {
  RegistryEntity,
  RegistryEntityWithFieldAccess,
  RegistryFieldAccessType
} from "@/types/registry-entity.type"
import {
  useApiDownload,
  useApiMutation,
  useApiUpload
} from "../use-api-mutation.hook"
import { useSwr } from "../use-swr.hook"
import type { AxiosResponse } from "axios"

export async function createRegistry(newRegistry: Omit<RegistryEntity, "id">) {
  try {
    return await useApiMutation<Omit<RegistryEntity, "id">>(
      "post",
      "/registry/create",
      newRegistry
    )
  } catch (error) {
    console.error("Failed to create registry:", error)
    throw error
  }
}
export async function updateRegistry(newRegistry: RegistryEntity) {
  try {
    await useApiMutation<RegistryEntity>(
      "post",
      "/registry/update",
      newRegistry
    )
  } catch (error) {
    console.error("Failed to update registry:", error)
  }
}
export function useRegistryFindMany() {
  const {
    data: registries,
    error,
    isLoading,
    mutate
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>[]>>(
    "/registry/all"
  )

  return { registries, error, isLoading, mutate }
}

export function useRegistryFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading
  } = useSwr<AxiosResponse<Partial<RegistryEntityWithFieldAccess>>>(
    `/registry/${id}`
  )

  return { registry, error, isLoading }
}

export function useRegistryFieldAccessFindMany() {
  const {
    data: fieldAccesses,
    error,
    isLoading
  } = useSwr<AxiosResponse<Partial<RegistryFieldAccessType>[]>>(
    "setting/registry/access/all"
  )

  return { fieldAccesses, error, isLoading }
}
export async function RegistryUpsertFieldAccess(
  newRegistry: Omit<RegistryFieldAccessType, "id">
) {
  try {
    return await useApiMutation<Omit<RegistryFieldAccessType, "id">>(
      "post",
      "setting/registry/access/assign",
      newRegistry
    )
  } catch (error) {
    console.error("Failed to upsert field access:", error)
    throw error
  }
}

export function useRegistryImportXlsx() {
  return useApiUpload("/registry/import/file/upload")
}

export function useRegistryExportEmpty() {
  return useApiDownload("/registry/export/empty")
}
