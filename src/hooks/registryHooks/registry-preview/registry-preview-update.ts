
import { useApiMutation } from "@/hooks/api-hooks/use-api-mutation";
import { RegistryType } from "../types/registry.type";

export async function updatePreviewRegistry(newRegistry: RegistryType) {
  try {
    return await useApiMutation<RegistryType>("post", "/registry/preview/update", newRegistry);
  } catch (error) {
    console.error("Failed to update preview registry:", error);
    throw error;
  }
}
