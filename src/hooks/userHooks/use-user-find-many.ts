import { useApiFetch } from "../api-hooks/use-api-fetch";
import { userType } from "./types/user-type";

export function useUserFindMany() {
  const { data: users, error, isLoading } = useApiFetch<userType[]>("/user/all");

  return { users, error, isLoading };
}
