import { useApiMutation } from "../api-hooks/use-api-mutation";
import { userType } from "./types/user-type";

export async function updateUser(newUser: userType) {
  try {
    return await useApiMutation<userType>("post", "/user/update", newUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}
