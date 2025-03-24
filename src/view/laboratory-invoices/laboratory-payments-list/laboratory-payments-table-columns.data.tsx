import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";
import { LaboratoryInvoicePaymentEntity } from "@/types/laboratory-invoice.type";

export type LaboratoryPaymentDataTableRow = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  LaboratoryInvoiceId: string;
  LaboratoryId: string;
  amountPaid: string;
  paymentDate: string;
  currency: string;
  notes: string;
  createdById: string;
  updatedById: string | null;
  createdBy: {
    name: string;
    email: string;
    position: string;
    id: string;
  };
  updatedBy: string | null;
  Laboratory: {
    name: string;
  };
  invoiceNumber: number;
};

export const laboratoryPaymentColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<LaboratoryPaymentDataTableRow>
>[0] = [
  { id: "Laboratory", title: "Laboratory", dataType: "user", readonly: true },
  { id: "amountPaid", title: "Amount", dataType: "number" },
  { id: "paymentDate", title: "Payment Date", dataType: "date" },
  { id: "currency", title: "Currency", dataType: "select" },
  { id: "notes", title: "Notes", dataType: "text" },
  { id: "createdBy", title: "Created By", dataType: "user", readonly: true },
  { id: "updatedBy", title: "Updated By", dataType: "user", readonly: true },
  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
];

export const laboratoryPaymentColumns = (
  columnsStructure: typeof laboratoryPaymentColumnsStructure,
) => {
  return dataTableColumnGenerator(columnsStructure);
};
