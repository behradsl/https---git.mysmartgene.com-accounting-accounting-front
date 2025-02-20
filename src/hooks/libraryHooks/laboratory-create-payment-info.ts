import { useApiMutation } from "../api-hooks/use-api-mutation";
import { LaboratoryFormalPaymentInfoType } from "./types/laboratory.type";

export async function createLaboratoryFormalPaymentInfo(
  newFormalPayment: Omit<LaboratoryFormalPaymentInfoType, "id">
) {
  try {
    return await useApiMutation<Omit<LaboratoryFormalPaymentInfoType, "id">>(
      "post",
      "/laboratory/create/payment-info",
      newFormalPayment
    );
  } catch (error) {
    console.error("Failed to create formal payment info:", error);
    throw error;
  }
}
