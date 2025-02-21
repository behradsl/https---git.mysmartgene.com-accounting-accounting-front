import type { AxiosResponse } from "axios";
import { useApiMutation } from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { UserEntity } from "@/types/user-entity.type";

export function useUserFindMany() {
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSwr<AxiosResponse<UserEntity[]>>("/user/all");

  console.log(users);

  return { users, error, isLoading, mutate };
}

export function useUserFindOne(id: string) {
  const {
    data: user,
    error,
    isLoading,
  } = useSwr<AxiosResponse<UserEntity>>(`/user/${id}`);

  return { user, error, isLoading };
}
export function useCreateUser() {
  const { trigger } = useApiMutation<
    Omit<UserEntity, "id" | "createdAt" | "updatedAt">
  >("post", "/user/create");
  return { trigger };
}
export function useUpdateUser() {
  const { trigger } = useApiMutation<
    Partial<Omit<UserEntity, "createdAt" | "updatedAt">>
  >("post", "/user/update");
  return { trigger };
}

export function useDeleteUser() {
  const { trigger } = useApiMutation<Pick<UserEntity, "id">>(
    "post",
    `/user/delete`,
  );
  return { trigger };
}
