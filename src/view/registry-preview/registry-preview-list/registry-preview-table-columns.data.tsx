import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";


export type SettlementStatus = "SETTLED" | "PENDING" | "OVERDUE";
export type InvoiceStatus = "ISSUED" | "NOT_ISSUED";
export type SampleStatus =
  | "PENDING"
  | "SHIPMENT"
  | "SHIPPED"
  | "RECEIVED_AT_laboratory"
  | "IN_TESTING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED";

export type PreviewDataTableRow = {
  id: string;
  MotId: string;
  name: string;

  Laboratory: string;
  serviceType: string;
  kitType: string;
  urgentStatus?: boolean;
  price: number;
  description?: string;
  costumerRelationInfo?: string;
  KoreaSendDate?: string;
  resultReady?: boolean;
  resultReadyTime?: string;
  settlementStatus: SettlementStatus;
  invoiceStatus: InvoiceStatus;
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
  sampleStatus: SampleStatus;
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

const data: Parameters<
  typeof dataTableColumnGenerator<PreviewDataTableRow>
>[0] = [
  { id: "MotId", title: "MOT ID", dataType: "text" },
  { id: "name", title: "Name", dataType: "text" },
  { id: "Laboratory", title: "Laboratory", dataType: "select" },
  { id: "kitType", title: "Kit Type", dataType: "text" },
  { id: "UrgentStatus", title: "Urgent Status", dataType: "switch" },
  { id: "proformaSent", title: "Urgent Status", dataType: "switch" },
  { id: "resultReady", title: "Urgent Status", dataType: "switch" },
  { id: "officialInvoiceSent", title: "Urgent Status", dataType: "switch" },
  { id: "price", title: "price", dataType: "number" },
  {
    id: "costumerRelationInfo",
    title: "Costumer Relation Info",
    dataType: "text",
  },
  { id: "settlementStatus", title: "Settlement Status", dataType: "text" },
  { id: "KoreaSendDate", title: "Korea Send Date", dataType: "date" },
  { id: "installmentOne", title: "Installment One ($)", dataType: "text" },
  { id: "installmentOneDate", title: "Installment One Date", dataType: "date" },
  { id: "installmentTwo", title: "Installment Two ($)", dataType: "text" },
  { id: "installmentTwoDate", title: "Installment Two Date", dataType: "date" },
  { id: "installmentThree", title: "Installment Three ($)", dataType: "text" },
  {
    id: "installmentThreeDate",
    title: "Installment Three Date",
    dataType: "date",
  },
  { id: "invoiceStatus", title: "Invoice Status", dataType: "select" },
  { id: "sampleStatus", title: "Sample Status", dataType: "select" },
  { id: "sendSeries", title: "Send Series", dataType: "text" },
  { id: "createdAt", title: "Created At", dataType: "date" },
  { id: "updatedAt", title: "Updated At", dataType: "date" },
  { id: "registryCreatedBy", title: "Registry Created By", dataType: "user" },
  { id: "registryUpdatedBy", title: "Registry Updated By", dataType: "user" },
];

export const registryColumns = dataTableColumnGenerator(data);
