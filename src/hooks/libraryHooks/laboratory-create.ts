import { useApiMutation } from "../api-hooks/use-api-mutation";
import { LaboratoryType } from "./types/laboratory.type";

export async function createLaboratory(
  newLaboratory: Omit<LaboratoryType, "id">
) {
  try {
    return await useApiMutation<Omit<LaboratoryType, "id">>(
      "post",
      "/laboratory/create",
      newLaboratory
    );
  } catch (error) {
    console.error("Failed to create laboratory:", error);
    throw error;
  }
}
