import type { AxiosResponse } from "axios"
import { useApiMutation } from "../use-api-mutation.hook"
import { useSwr } from "../use-swr.hook"
import type { UserEntity } from "@/types/user-entity.type"

export function useUserFindMany() {
  const {
    data: users,
    error,
    isLoading
  } = useSwr<AxiosResponse<UserEntity[]>>("/user/all?page=1&limit=10000")

  return { users, error, isLoading }
}

export function useUserFindOne(id: string) {
  const {
    data: user,
    error,
    isLoading
  } = useSwr<AxiosResponse<UserEntity>>(`/user/${id}`)

  return { user, error, isLoading }
}
export async function createUser(
  newUser: Omit<UserEntity, "id" | "createdAt" | "updatedAt"> & {
    password: string
  }
) {
  try {
    return await useApiMutation<
      Omit<UserEntity, "id" | "createdAt" | "updatedAt">
    >("post", "/user/create", newUser)
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}
export async function updateUser(
  newUser: Omit<UserEntity, "createdAt" | "updatedAt">
) {
  try {
    return await useApiMutation<typeof newUser>("post", "/user/update", newUser)
  } catch (error) {
    console.error("Failed to update user:", error)
    throw error
  }
}

export async function deleteUser(userId: string) {
  try {
    return await useApiMutation<Pick<UserEntity, "id">>(
      "delete",
      `/user/delete/${userId}`
    )
  } catch (error) {
    console.error("Failed to delete user:", error)
    throw error
  }
}
