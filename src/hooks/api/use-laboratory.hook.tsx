import type {
  LaboratoryEntity,
  LaboratoryFormalPaymentInfoType,
} from "@/types/laboratory-entity.type";
import { useSwr } from "../use-swr.hook";
import { useApiMutation } from "../use-api-mutation.hook";

export function useCreateLaboratory() {
  const { trigger } = useApiMutation<Omit<LaboratoryEntity, "id">>(
    "post",
    "/laboratory/create",
  );
  return trigger;
}
export function useUpdateLaboratory() {
  const { trigger } = useApiMutation<LaboratoryEntity>(
    "post",
    "/laboratory/update",
  );
  return trigger;
}

export function useCreateLaboratoryFormalPaymentInfo() {
  const { trigger } = useApiMutation<
    Omit<LaboratoryFormalPaymentInfoType, "id">
  >("post", "/laboratory/create/payment-info");
  return trigger;
}
export function useUpdateLaboratoryFormalPaymentInfo() {
  const { trigger } = useApiMutation<LaboratoryFormalPaymentInfoType>(
    "post",
    "/laboratory/update/payment-info",
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
