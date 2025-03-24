import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";
import {
  LaboratoryInvoiceEntity,
  InvoiceCurrencyType,
  LaboratoryInvoiceStatusType,
} from "@/types/laboratory-invoice.type";

export type LaboratoryInvoicesDataTableRow = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: {
    name: string;
    email: string;
    position: string;
    id: string;
  };
  updatedBy?: {
    name: string;
    email: string;
    position: string;
    id: string;
  };
} & LaboratoryInvoiceEntity;

export const laboratoryInvoicesColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<LaboratoryInvoicesDataTableRow>
>[0] = [
  {
    id: "invoiceNumber",
    title: "Invoice Number",
    dataType: "text",
    readonly: true,
  },
  {
    alternativeId: "Laboratory",
    id: "LaboratoryId",
    title: "Laboratory",
    dataType: "user",
    readonly: true,
  },
  { id: "status", title: "Status", dataType: "select", readonly: true },
  {
    id: "paymentStatus",
    title: "Payment Status",
    dataType: "select",
    readonly: true,
  },
  { id: "invoiceDate", title: "Invoice Date", dataType: "date" },
  { id: "paymentDueDate", title: "Payment Due Date", dataType: "date" },

  {
    id: "totalUsdPrice",
    title: "Total Price (USD)",
    dataType: "number",
    readonly: true,
  },
  { id: "usdExchangeRate", title: "USD Exchange Rate", dataType: "number" },
  {
    id: "totalPriceRial",
    title: "Total Price (Rial)",
    dataType: "number",
    readonly: true,
  },
  {
    id: "outstandingAmount",
    title: "Outstanding Amount",
    dataType: "number",
    readonly: true,
  },
  { id: "notes", title: "Notes", dataType: "text" },
  { id: "createdBy", title: "Created By", dataType: "user", readonly: true },
  { id: "updatedBy", title: "Updated By", dataType: "user", readonly: true },
  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
];

export const laboratoryInvoicesColumns = (
  columnsStructure: typeof laboratoryInvoicesColumnsStructure,
) => {
  return dataTableColumnGenerator<LaboratoryInvoicesDataTableRow>(
    columnsStructure,
  );
};
