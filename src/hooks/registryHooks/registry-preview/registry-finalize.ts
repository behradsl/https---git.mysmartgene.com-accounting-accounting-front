import { useApiMutation } from "@/hooks/api-hooks/use-api-mutation";


export async function registryFinalize(id: string) {
  try {
    return await useApiMutation<string>("post", "/registry/preview/finalize", id);
  } catch (error) {
    console.error("Failed to finalize registry:", error);
    throw error;
  }
}
