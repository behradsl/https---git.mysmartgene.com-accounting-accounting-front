import type {
  LaboratoryInvoiceCreateEntity,
  LaboratoryInvoiceEntity,
  LaboratoryInvoicePaymentEntity,
} from "@/types/laboratory-invoice.type";
import { useSwr } from "../use-swr.hook";
import { useApiMutation } from "../use-api-mutation.hook";
import { AxiosResponse } from "axios";
import { useState } from "react";

export function useCreateLaboratoryInvoice() {
  const { trigger } = useApiMutation<Omit<LaboratoryInvoiceCreateEntity, "id">>(
    "post",
    "/invoice/create",
  );
  return { trigger };
}
export function useUpdateLaboratoryInvoice() {
    const { trigger } = useApiMutation<Partial<LaboratoryInvoiceEntity>>(
    "post",
    `/invoice/update`,
  );
  return { trigger };
}

export function useLaboratoryInvoiceFindMany() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortBy, setSortBy] = useState<{
    direction: "asc" | "desc";
    columnId: string;
  }>({ columnId: "createdAt", direction: "desc" });
  const {
    data: laboratoryInvoices,
    error,
    isLoading,
    mutate,
  } = useSwr<
    AxiosResponse<{
      invoices: Partial<LaboratoryInvoiceEntity[]>;
      count: number;
    }>
  >(
    `/invoice/find/all?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
  );

  return {
    laboratoryInvoices: laboratoryInvoices?.data,
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
export function useLaboratoryInvoiceFindManyFiltered() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortBy, setSortBy] = useState<{
    direction: "asc" | "desc";
    columnId: string;
  }>({ columnId: "createdAt", direction: "desc" });
  const {
    data: laboratoryInvoices,
    error,
    isLoading,
    mutate,
  } = useSwr<
    AxiosResponse<{
      invoices: Partial<LaboratoryInvoiceEntity[]>;
      count: number;
    }>
  >(
    `/invoice/find/all/filtered?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
  );

  return {
    laboratoryInvoices: laboratoryInvoices?.data,
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

export function useLaboratoryInvoiceFindOne(id: string) {
  const {
    data: laboratoryInvoice,
    error,
    isLoading,
  } = useSwr<AxiosResponse<LaboratoryInvoiceEntity>>(`/invoice/${id}`);

  return { laboratoryInvoice, error, isLoading };
}

export function useLaboratoryInvoiceIssuance() {
  const { trigger } = useApiMutation<{ id: string }>(
    "post",
    `/invoice/issuance`,
  );
  return { trigger };
}
export function useLaboratoryInvoiceCancellation() {
  const { trigger } = useApiMutation<{ id: string }>(
    "post",
    `/invoice/cancellation`,
  );
  return { trigger };
}

export function useDeleteLaboratoryInvoice() {
  const { trigger } = useApiMutation<{ id: string }>(
    "delete",
    "/invoice/delete",
  );
  return { trigger };
}

export function useCreateLaboratoryInvoicePayment() {
  const { trigger } = useApiMutation<LaboratoryInvoicePaymentEntity>(
    "post",
    "/payment/create",
  );
  return { trigger };
}

export function useUpdateLaboratoryInvoicePayment() {
  const { trigger } = useApiMutation<Partial<LaboratoryInvoicePaymentEntity>>(
    "post",
    `/payment/update`,
  );
  return { trigger };
}

export function useLaboratoryInvoicePaymentFindMany() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortBy, setSortBy] = useState<{
    direction: "asc" | "desc";
    columnId: string;
  }>({ columnId: "createdAt", direction: "desc" });
  const {
    data: laboratoryInvoicePayments,
    error,
    isLoading,
    mutate,
  } = useSwr<
    AxiosResponse<{
      payments: Partial<LaboratoryInvoicePaymentEntity>[];
      count: number;
      totalUsdPayment: string;
      totalRialPayment: string;
    }>
  >(
    `/payment/find/all?page=${currentPage}&limit=${pageSize}&sortingBy=${sortBy.columnId}&orderBy=${sortBy.direction}`,
  );
  return {
    laboratoryInvoicePayments: laboratoryInvoicePayments?.data,
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

export function useLaboratoryInvoiceExportAll() {
  const { trigger } = useApiMutation<{ ids: string[] }>(
    "post",
    "/invoice/export",
  );
  return { downloadData: trigger };
}
