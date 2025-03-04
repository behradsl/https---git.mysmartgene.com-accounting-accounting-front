import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LaboratoriesType, PaymentType } from "@/types/laboratory-entity.type";
import { type ColumnDef } from "@tanstack/react-table";

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

  accountManager: { name: string; position: string };

  createdAt: string;
  updatedAt: string;
  createdBy: { name: string; position: string };

  LaboratoryFormalPaymentInfo: { id: string };
};

export const LaboratoryColumns: ColumnDef<LaboratoriesDataTableRow>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.name}</div>
    ),
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.type}</div>
    ),
  },
  {
    id: "code",
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.code}</div>
    ),
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.address}</div>
    ),
  },
  {
    id: "contactName",
    accessorKey: "contactName",
    header: "Contact Name",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.contactName}</div>
    ),
  },
  {
    id: "Email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.email}</div>
    ),
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.phoneNumber}</div>
    ),
  },
  {
    id: "fax",
    accessorKey: "fax",
    header: "Fax",
    cell: ({ row }) => (
      <div className='  font-semibold'>{row.original.fax}</div>
    ),
  },
  {
    id: "accounting manager",
    accessorKey: "accounting manager",
    header: "accounting manager",
    cell: ({ row }) => {
      return row.original?.accountManager ? (
        <Card className='w-56'>
          <CardContent>{row.original.accountManager.name}</CardContent>
        </Card>
      ) : (
        "-"
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "created at",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },

  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "updated at",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },

  {
    id: "CreatedBy",
    accessorKey: "CreatedBy",
    header: "Created By",
    cell: ({ row }) => {
      return row.original?.createdBy ? (
        <Card className='w-56'>
          <CardContent>{row.original.createdBy.name}</CardContent>
        </Card>
      ) : (
        "-"
      );
    },
  },

  {
    id: "formalPaymentInfo",
    accessorKey: "formalPaymentInfo",
    header: "Formal Payment Info",
    cell: ({ row }) => {
      const href = row?.original.LaboratoryFormalPaymentInfo
        ? `laboratories/laboratories-formal-payment-info/${row.original?.id}`
        : `laboratories/laboratories-formal-payment-info/create/${row.original?.id}`;

      return (
        <Button asChild>
          <a href={href}>
            {row?.original.LaboratoryFormalPaymentInfo ? "View" : "Add"}
          </a>
        </Button>
      );
    },
  },
];
