import type {
  LaboratoryEntity,
  LaboratoryFormalPaymentInfoType,
} from "@/types/laboratory-entity.type";
import { useSwr } from "../use-swr.hook";
import { useApiMutation } from "../use-api-mutation.hook";
import { AxiosResponse } from "axios";
import { useState } from "react";

export function useCreateLaboratory() {
  const { trigger } = useApiMutation<Omit<LaboratoryEntity, "id">>(
    "post",
    "/laboratory/create",
  );
  return { trigger };
}
export function useUpdateLaboratory() {
  const { trigger } = useApiMutation<LaboratoryEntity>(
    "post",
    "/laboratory/update",
  );
  return { trigger };
}

export function useCreateLaboratoryFormalPaymentInfo() {
  const { trigger } = useApiMutation<
    Omit<LaboratoryFormalPaymentInfoType["LaboratoryFormalPaymentInfo"], "id">
  >("post", "/laboratory/payment-info/create");

  return async (
    data: Omit<
      LaboratoryFormalPaymentInfoType["LaboratoryFormalPaymentInfo"],
      "id"
    >,
  ) => {
    return await trigger(data);
  };
}

export function useUpdateLaboratoryFormalPaymentInfo() {
  const { trigger } = useApiMutation<
    Omit<LaboratoryFormalPaymentInfoType["LaboratoryFormalPaymentInfo"], "id">
  >("post", "/laboratory/payment-info/update");

  return async (
    data: Omit<
      LaboratoryFormalPaymentInfoType["LaboratoryFormalPaymentInfo"],
      "id"
    >,
  ) => {
    return await trigger(data);
  };
}

export function useLaboratoryFormalPaymentInfoFind(id: string) {
  const {
    data: paymentInfo,
    error,
    isLoading,
  } = useSwr<AxiosResponse<LaboratoryFormalPaymentInfoType>>(
    `/laboratory/payment-info/${id}`,
  );

  return { paymentInfo, error, isLoading };
}

export function useLaboratoryFindMany() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortBy, setSortBy] = useState<{
    direction: "asc" | "desc";
    columnId: string;
  }>({ columnId: "createdAt", direction: "desc" });
  const {
    data: laboratories,
    error,
    isLoading,
    mutate,
  } = useSwr<AxiosResponse<Partial<LaboratoryEntity[]>>>(
    `/laboratory/all?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
  );

  return {
    laboratories,
    error,
    isLoading,
    mutate,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
  };
}

export function useLaboratoryFindOne(id: string) {
  const {
    data: laboratory,
    error,
    isLoading,
  } = useSwr<AxiosResponse<LaboratoryEntity>>(`/laboratory/${id}`);

  return { laboratory, error, isLoading };
}

export function useDeleteLaboratory() {
  const { trigger } = useApiMutation<{ id: string }>(
    "delete",
    "/laboratory/delete",
  );
  return { trigger };
}
