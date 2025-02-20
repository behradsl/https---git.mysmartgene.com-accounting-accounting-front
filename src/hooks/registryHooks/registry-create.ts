import { RegistryType } from "./types/registry.type";
import { useApiMutation } from "../api-hooks/use-api-mutation";

export async function createRegistry(newRegistry: Omit<RegistryType, "id">) {
  try {
    return await useApiMutation<Omit<RegistryType, "id">>("post", "/registry/create", newRegistry);
  } catch (error) {
    console.error("Failed to create registry:", error);
    throw error;
  }
}
