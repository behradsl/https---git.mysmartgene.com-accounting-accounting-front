import type { AxiosResponse } from "axios";
import { useApiMutation } from "../use-api-mutation.hook";
import { useSwr } from "../use-swr.hook";
import type { UserEntity } from "@/types/user-entity.type";

export function useUserFindMany() {
  const {
    data: users,
    error,
    isLoading,
  } = useSwr<AxiosResponse<UserEntity[]>>("/user/all");

  console.log(users);

  return { users, error, isLoading };
}

export function useUserFindOne(id: string) {
  const {
    data: user,
    error,
    isLoading,
  } = useSwr<AxiosResponse<UserEntity>>(`/user/${id}`);

  return { user, error, isLoading };
}
export function useCreateUser(
  newUser: Omit<UserEntity, "id" | "createdAt" | "updatedAt"> & {
    password: string;
  },
) {
  const { trigger } = useApiMutation<
    Omit<UserEntity, "id" | "createdAt" | "updatedAt">
  >("post", "/user/create", newUser);
  return trigger;
}
export function useUpdateUser(
  newUser: Partial<Omit<UserEntity, "createdAt" | "updatedAt">>,
) {
  const { trigger } = useApiMutation<Partial<Omit<UserEntity, "createdAt" | "updatedAt">>>(
    "post",
    "/user/update",
    newUser,
  );
  return trigger;
}

export function useDeleteUser(userId: string) {
  const { trigger } = useApiMutation<Pick<UserEntity, "id">>(
    "delete",
    `/user/delete/${userId}`,
  );
  return trigger;
}
