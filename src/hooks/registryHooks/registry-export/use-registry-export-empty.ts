import { useExportApiFetch } from "@/hooks/api-hooks/use-export-api-fetch";

export function useRegistryExportEmpty() {
  return useExportApiFetch("/registry/export/empty");
}
