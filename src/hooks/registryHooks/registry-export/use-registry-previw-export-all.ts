import { useExportApiFetch } from "@/hooks/api-hooks/use-export-api-fetch";

export function useRegistryPreviewExportAll() {
  return useExportApiFetch("/registry/preview/export/all");
}
