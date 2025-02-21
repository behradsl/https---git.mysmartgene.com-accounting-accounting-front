import type {
  LaboratoryEntity,
  LaboratoryFormalPaymentInfoType,
} from "@/types/laboratory-entity.type";
import { useSwr } from "../use-swr.hook";
import { useApiMutation } from "../use-api-mutation.hook";

export function useCreateLaboratory(
  newLaboratory: Omit<LaboratoryEntity, "id">,
) {
  const { trigger } = useApiMutation<Omit<LaboratoryEntity, "id">>(
    "post",
    "/laboratory/create",
    newLaboratory,
  );
  return trigger;
}
export function useUpdateLaboratory(newLaboratory: LaboratoryEntity) {
  const { trigger } = useApiMutation<LaboratoryEntity>(
    "post",
    "/laboratory/update",
    newLaboratory,
  );
  return trigger;
}

export function useCreateLaboratoryFormalPaymentInfo(
  newFormalPayment: Omit<LaboratoryFormalPaymentInfoType, "id">,
) {
  const { trigger } = useApiMutation<
    Omit<LaboratoryFormalPaymentInfoType, "id">
  >("post", "/laboratory/create/payment-info", newFormalPayment);
  return trigger;
}
export function useUpdateLaboratoryFormalPaymentInfo(
  newFormalPayment: LaboratoryFormalPaymentInfoType,
) {
  const { trigger } = useApiMutation<LaboratoryFormalPaymentInfoType>(
    "post",
    "/laboratory/update/payment-info",
    newFormalPayment,
  );
  return trigger;
}

export function useLaboratoryFindMany() {
  const {
    data: laboratories,
    error,
    isLoading,
  } = useSwr<LaboratoryEntity[]>("/laboratory/all");

  return { laboratories, error, isLoading };
}

export function useUserFindOne(id: string) {
  const {
    data: laboratory,
    error,
    isLoading,
  } = useSwr<LaboratoryEntity>(`/laboratory/${id}`);

  return { laboratory, error, isLoading };
}
