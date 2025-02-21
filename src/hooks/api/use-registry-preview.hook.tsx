import type { RegistryEntity } from "@/types/registry-entity.type"
import { useApiDownload, useApiMutation } from "../use-api-mutation.hook"
import { useSwr } from "../use-swr.hook"
import type { AxiosResponse } from "axios"

export function useRegistryPreviewFindOne(id: string) {
  const {
    data: registry,
    error,
    isLoading
  } = useSwr<Partial<RegistryEntity>>(`/registry/preview/${id}`)

  return { registry, error, isLoading }
}

export function useRegistryPreviewFindMany() {
  const {
    data: registries,
    error,
    isLoading
  } = useSwr<AxiosResponse<Partial<RegistryEntity>[]>>("/registry/preview/all")

  return { registries, error, isLoading }
}

export async function updatePreviewRegistry(newRegistry: RegistryEntity) {
  try {
    return await useApiMutation<RegistryEntity>(
      "post",
      "/registry/preview/update",
      newRegistry
    )
  } catch (error) {
    console.error("Failed to update preview registry:", error)
    throw error
  }
}

export async function registryFinalize(id: string) {
  try {
    return await useApiMutation<string>(
      "post",
      "/registry/preview/finalize",
      id
    )
  } catch (error) {
    console.error("Failed to finalize registry:", error)
    throw error
  }
}

export function useRegistryPreviewExportAll() {
  return useApiDownload("/registry/preview/export/all")
}
