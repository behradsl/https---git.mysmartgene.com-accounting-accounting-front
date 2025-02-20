import { RegistryType } from "./types/registry.type";
import { useApiMutation } from "../api-hooks/use-api-mutation";

export async function updateRegistry(newRegistry: RegistryType) {
  try {
    await useApiMutation<RegistryType>("post", "/registry/update", newRegistry);
  } catch (error) {
    console.error("Failed to update registry:", error);
  }
}