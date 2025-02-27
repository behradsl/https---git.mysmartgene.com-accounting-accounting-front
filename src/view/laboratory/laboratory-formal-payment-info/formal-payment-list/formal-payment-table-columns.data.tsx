import { type ColumnDef } from "@tanstack/react-table";

export type PaymentInfoDataTableRow = {
  name: string;
  laboratoryId: string;
  legalEntityName: string;
  economicNumber: string;
  nationalId: string;
  fullAddress: string;
  province: string;
  city: string;
  registrationNumber: string;
  postalCode: string;
};

export const PaymentInfoColumns: ColumnDef<PaymentInfoDataTableRow>[] = [
  {
    id: "laboratoryName",
    accessorKey: "name",
    header: "Laboratory Name",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.name}</div>
    ),
  },
  {
    id: "registrationNumber",
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => (
      <div className="  font-semibold">
        {row.original.registrationNumber}
      </div>
    ),
  },
  {
    id: "legalEntityName",
    accessorKey: "legalEntityName",
    header: "Legal Entity Name",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.legalEntityName}</div>
    ),
  },
  {
    id: "economicNumber",
    accessorKey: "economicNumber",
    header: "Economic Number",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.economicNumber}</div>
    ),
  },
  {
    id: "nationalId",
    accessorKey: "nationalId", // Fixed: No space in the key
    header: "National ID",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.nationalId}</div>
    ),
  },
  {
    id: "postalCode",
    accessorKey: "postalCode",
    header: "Postal Code",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.postalCode}</div>
    ),
  },
  {
    id: "fullAddress",
    accessorKey: "fullAddress",
    header: "Full Address",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.fullAddress}</div>
    ),
  },
  {
    id: "province",
    accessorKey: "province",
    header: "Province",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.province}</div>
    ),
  },
  {
    id: "city",
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => (
      <div className="  font-semibold">{row.original.city}</div>
    ),
  },
];
