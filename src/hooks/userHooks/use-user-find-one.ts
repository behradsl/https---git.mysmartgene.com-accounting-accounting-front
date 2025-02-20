import { useApiFetch } from "../api-hooks/use-api-fetch";
import { userType } from "./types/user-type";

export function useUserFindOne(id: string) {
  const { data: user, error, isLoading } = useApiFetch<userType>(`/user/${id}`);

  return { user, error, isLoading };
}
