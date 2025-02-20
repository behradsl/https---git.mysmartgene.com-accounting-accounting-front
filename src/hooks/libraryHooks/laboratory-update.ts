import { useApiMutation } from "../api-hooks/use-api-mutation";
import { LaboratoryType } from "./types/laboratory.type";

export async function updateLaboratory(newLaboratory: LaboratoryType) {
  try {
    return await useApiMutation<LaboratoryType>(
      "post",
      "/laboratory/update",
      newLaboratory
    );
  } catch (error) {
    console.error("Failed to update laboratory:", error);
    throw error;
  }
}
