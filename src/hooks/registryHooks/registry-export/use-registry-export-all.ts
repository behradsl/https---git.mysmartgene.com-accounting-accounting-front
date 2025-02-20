import { useExportApiFetch } from "@/hooks/api-hooks/use-export-api-fetch";

export function useRegistryExportAll() {
  return useExportApiFetch("/registry/export/all");
}
