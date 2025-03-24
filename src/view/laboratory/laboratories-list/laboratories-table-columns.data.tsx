import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";
import { Button } from "@/components/ui/button";
import { LaboratoriesType, PaymentType } from "@/types/laboratory-entity.type";
import FormalPaymentInfoModal from "../laboratory-formal-payment-info/formal-payment-modal";

export type LaboratoriesDataTableRow = {
  id: string;
  name: string;
  type: LaboratoriesType;
  code: string | null;
  address: string | null;
  contactName: string | null;
  phoneNumber: string | null;
  email: string | null;
  paymentType: PaymentType;
  fax: string | null;

  accountManager: { name: string; position: string; id: string };

  createdAt: string;
  updatedAt: string;
  createdBy: { name: string; position: string; id: string };

  LaboratoryFormalPaymentInfo: { id: string } | null;
};

export const laboratoriesColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<LaboratoriesDataTableRow>
>[0] = [
  { id: "name", title: "Name", dataType: "text" },
  {
    id: "type",
    title: "Type",
    dataType: "select",
    placeholder: "Select laboratory type",
  },
  { id: "code", title: "Code", dataType: "text" },
  { id: "address", title: "Address", dataType: "text" },
  { id: "contactName", title: "Contact Name", dataType: "text" },
  { id: "email", title: "Email", dataType: "text" },
  { id: "phoneNumber", title: "Phone Number", dataType: "text" },
  { id: "fax", title: "Fax", dataType: "text" },
  {
    id: "paymentType",
    title: "Payment Type",
    dataType: "select",
    placeholder: "Select payment type",
  },
  {
    id: "accountManager",
    title: "Account Manager",
    dataType: "user",
    readonly: true,
  },
  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
  {
    id: "createdBy",
    title: "Created By",
    dataType: "user",
    readonly: true,
  },
  {
    id: "LaboratoryFormalPaymentInfo",
    title: "Formal Payment Info",
    dataType: "action",
    cell: ({ row }) => {
      return (
        <div className='flex w-full'>
          <FormalPaymentInfoModal
            laboratoryId={row.original.id}
            laboratoryName={row.original.name}
            triggerLabel={
              row.original.LaboratoryFormalPaymentInfo ? "View" : "Add"
            }
            triggerVariant={
              row.original.LaboratoryFormalPaymentInfo ? "outline" : "default"
            }
          />
        </div>
      );
    },
  },
];

export const laboratoriesColumns = (
  columnsStructure: typeof laboratoriesColumnsStructure,
) => {
  return dataTableColumnGenerator(columnsStructure);
};
