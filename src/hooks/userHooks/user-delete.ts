import { useApiMutation } from "../api-hooks/use-api-mutation";

type UserId = { id: string };

export async function deleteUser(userId: UserId) {
  try {
    return await useApiMutation<UserId>("delete", `/user/delete/${userId.id}`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}