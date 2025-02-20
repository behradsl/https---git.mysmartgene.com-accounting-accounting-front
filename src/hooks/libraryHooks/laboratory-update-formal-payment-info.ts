import { useApiMutation } from "../api-hooks/use-api-mutation";
import { LaboratoryFormalPaymentInfoType } from "./types/laboratory.type";

export async function updateLaboratoryFormalPaymentInfo(
  newFormalPayment: LaboratoryFormalPaymentInfoType
) {
  try {
    return await useApiMutation<LaboratoryFormalPaymentInfoType>(
      "post",
      "/laboratory/update/payment-info",
      newFormalPayment
    );
  } catch (error) {
    console.error("Failed to update formal payment info:", error);
    throw error;
  }
}
