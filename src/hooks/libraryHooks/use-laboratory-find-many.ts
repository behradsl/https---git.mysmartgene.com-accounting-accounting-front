import { useApiFetch } from "../api-hooks/use-api-fetch";
import { LaboratoryType } from "./types/laboratory.type";

export function useLaboratoryFindMany() {
  const { data: laboratories, error, isLoading } = useApiFetch<LaboratoryType[]>(
    "/laboratory/all"
  );

  return { laboratories, error, isLoading };
}
