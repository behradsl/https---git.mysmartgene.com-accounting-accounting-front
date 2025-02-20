import { useImportApiFetch } from "@/hooks/api-hooks/use-import-api-fetch";

export function useRegistryExportEmpty() {
  return useImportApiFetch("registry/import/file/upload");
}
