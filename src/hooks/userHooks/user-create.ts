import { useApiMutation } from "../api-hooks/use-api-mutation";
import { userType } from "./types/user-type";

export async function createUser(newUser: Omit<userType, "id">) {
  try {
    return await useApiMutation<Omit<userType, "id">>(
      "post",
      "/user/create",
      newUser
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
