import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";

export type RegistrySettlementStatus = "SETTLED" | "PENDING" | "OVERDUE";
export type RegistryInvoiceStatus = "ISSUED" | "NOT_ISSUED";
export type RegistrySampleStatus =
  | "PENDING"
  | "SHIPMENT"
  | "SHIPPED"
  | "RECEIVED_AT_laboratory"
  | "IN_TESTING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED";

export type RegistryDataTableRow = {
  id: string;
  MotId: string;
  name: string;

  Laboratory: string;
  laboratoryId: string;
  serviceType: string;
  kitType: string;
  urgentStatus?: boolean;
  price: number;
  description?: string;
  costumerRelationInfo?: string;
  KoreaSendDate?: string;
  resultReady?: boolean;
  resultReadyTime?: string;
  settlementStatus: RegistrySettlementStatus;
  invoiceStatus: RegistryInvoiceStatus;
  proformaSent?: boolean;
  proformaSentDate?: string;
  totalInvoiceAmount: number;
  installmentOne?: number;
  installmentOneDate?: string;
  installmentTwo?: number;
  installmentTwoDate?: string;
  installmentThree?: number;
  installmentThreeDate?: string;
  totalPaid: number;
  settlementDate?: string;
  officialInvoiceSent?: boolean;
  officialInvoiceSentDate?: string;
  sampleStatus: RegistrySampleStatus;
  sendSeries: string;
  createdAt: string;
  updatedAt: string;

  registryCreatedBy: {
    name: string;
    email: string;
    position: string;
    id: string;
  };

  updatedBy: {
    name: string;
    email: string;
    position: string;
    id: string;
  };
};

export const registryColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<RegistryDataTableRow>
>[0] = [
  { id: "MotId", title: "MOT ID", dataType: "text" },
  { id: "name", title: "Name", dataType: "text" },
  { id: "laboratoryId", title: "Laboratory", dataType: "select" },
  { id: "kitType", title: "Kit Type", dataType: "text" },
  { id: "urgentStatus", title: "Urgent Status", dataType: "switch" },
  { id: "proformaSent", title: "Proforma Sent", dataType: "switch" },
  { id: "resultReady", title: "Result Ready", dataType: "switch" },
  {
    id: "officialInvoiceSent",
    title: "Official Invoice Sent",
    dataType: "switch",
  },
  { id: "price", title: "price", dataType: "number" },
  {
    id: "costumerRelationInfo",
    title: "Costumer Relation Info",
    dataType: "text",
  },
  { id: "settlementStatus", title: "Settlement Status", dataType: "text" },
  { id: "KoreaSendDate", title: "Korea Send Date", dataType: "date" },
  { id: "installmentOne", title: "Installment One ($)", dataType: "number" },
  { id: "installmentOneDate", title: "Installment One Date", dataType: "date" },
  { id: "installmentTwo", title: "Installment Two ($)", dataType: "number" },
  { id: "installmentTwoDate", title: "Installment Two Date", dataType: "date" },
  {
    id: "installmentThree",
    title: "Installment Three ($)",
    dataType: "number",
  },
  {
    id: "installmentThreeDate",
    title: "Installment Three Date",
    dataType: "date",
  },
  { id: "invoiceStatus", title: "Invoice Status", dataType: "select" },
  { id: "sampleStatus", title: "Sample Status", dataType: "select" },
  { id: "sendSeries", title: "Send Series", dataType: "text" },
  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
  {
    id: "userIdRegistryCreatedBy",
    alternativeId: "registryCreatedBy",
    title: "Registry Created By",
    dataType: "user",
    readonly: true,
  },
  {
    id: "userIdRegistryUpdatedBy",
    alternativeId: "updatedBy",
    title: "Registry Updated By",
    dataType: "user",
    readonly: true,
  },
];

export const registryColumns = (columnsStructure: typeof registryColumnsStructure) => {
  return dataTableColumnGenerator(columnsStructure);
};
