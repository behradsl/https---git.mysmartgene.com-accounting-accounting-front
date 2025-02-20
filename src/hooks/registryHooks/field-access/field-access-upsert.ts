import { useApiMutation } from "@/hooks/api-hooks/use-api-mutation";
import { RegistryFieldAccessType } from "../types/registry.type";


export async function upsertFieldAccess(newRegistry: Omit<RegistryFieldAccessType, "id">) {
  try {
    return await useApiMutation<Omit<RegistryFieldAccessType, "id">>(
      "post",
      "setting/registry/access/assign",
      newRegistry
    );
  } catch (error) {
    console.error("Failed to upsert field access:", error);
    throw error;
  }
}
