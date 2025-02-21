import type {
  LaboratoryEntity,
  LaboratoryFormalPaymentInfoType
} from "@/types/laboratory-entity.type"
import { useSwr } from "../use-swr.hook"
import { useApiMutation } from "../use-api-mutation.hook"

export async function createLaboratory(
  newLaboratory: Omit<LaboratoryEntity, "id">
) {
  try {
    return await useApiMutation<Omit<LaboratoryEntity, "id">>(
      "post",
      "/laboratory/create",
      newLaboratory
    )
  } catch (error) {
    console.error("Failed to create laboratory:", error)
    throw error
  }
}
export async function updateLaboratory(newLaboratory: LaboratoryEntity) {
  try {
    return await useApiMutation<LaboratoryEntity>(
      "post",
      "/laboratory/update",
      newLaboratory
    )
  } catch (error) {
    console.error("Failed to update laboratory:", error)
    throw error
  }
}

export async function createLaboratoryFormalPaymentInfo(
  newFormalPayment: Omit<LaboratoryFormalPaymentInfoType, "id">
) {
  try {
    return await useApiMutation<Omit<LaboratoryFormalPaymentInfoType, "id">>(
      "post",
      "/laboratory/create/payment-info",
      newFormalPayment
    )
  } catch (error) {
    console.error("Failed to create formal payment info:", error)
    throw error
  }
}
export async function updateLaboratoryFormalPaymentInfo(
  newFormalPayment: LaboratoryFormalPaymentInfoType
) {
  try {
    return await useApiMutation<LaboratoryFormalPaymentInfoType>(
      "post",
      "/laboratory/update/payment-info",
      newFormalPayment
    )
  } catch (error) {
    console.error("Failed to update formal payment info:", error)
    throw error
  }
}

export function useLaboratoryFindMany() {
  const {
    data: laboratories,
    error,
    isLoading
  } = useSwr<LaboratoryEntity[]>("/laboratory/all")

  return { laboratories, error, isLoading }
}

export function useUserFindOne(id: string) {
  const {
    data: laboratory,
    error,
    isLoading
  } = useSwr<LaboratoryEntity>(`/laboratory/${id}`)

  return { laboratory, error, isLoading }
}
