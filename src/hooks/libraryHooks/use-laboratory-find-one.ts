import { useApiFetch } from "../api-hooks/use-api-fetch";
import { LaboratoryType } from "./types/laboratory.type";

export function useUserFindOne(id: string) {
  const { data: laboratory, error, isLoading } = useApiFetch<LaboratoryType>(`/laboratory/${id}`);

  return { laboratory, error, isLoading };
}
