"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export type SettlementStatus = "Pending" | "Completed" | "Failed";
export type InvoiceStatus = "Unpaid" | "Paid" | "Overdue";
export type SampleStatus = "Received" | "Processing" | "Completed";

// Define data structure
export type DataTableRow = {
  MotId: string;
  name: string;

  Laboratory: string;
  serviceType: string;
  kitType: string;
  urgentStatus?: boolean;
  price: number;
  description?: string;
  costumerRelationInfo?: string;
  KoreaSendDate?: Date;
  resultReady?: boolean;
  resultReadyTime?: Date;
  settlementStatus: SettlementStatus;
  invoiceStatus: InvoiceStatus;
  proformaSent?: boolean;
  proformaSentDate?: Date;
  totalInvoiceAmount: number;
  installmentOne?: number;
  installmentOneDate?: Date;
  installmentTwo?: number;
  installmentTwoDate?: Date;
  installmentThree?: number;
  installmentThreeDate?: Date;
  totalPaid: number;
  settlementDate?: Date;
  officialInvoiceSent?: boolean;
  officialInvoiceSentDate?: Date;
  sampleStatus: SampleStatus;
  sendSeries: string;
};

export const columns: ColumnDef<DataTableRow>[] = [
  { id: "MotId", accessorKey: "MotId", header: "MOT ID" },
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "Laboratory", accessorKey: "Laboratory", header: "Laboratory" },
  { id: "serviceType", accessorKey: "serviceType", header: "Service Type" },
  {
    id: "kitType",
    accessorKey: "kitType",
    header: "Kit Type",
    cell: ({ row }) => {
      console.log(row);
    },
  },
  {
    id: "urgentStatus",
    accessorKey: "urgentStatus",
    header: "Urgent",
    cell: ({ row }) =>
      row.getValue("urgentStatus") ? (
        <Badge variant="destructive">Urgent</Badge>
      ) : (
        "Normal"
      ),
  },
  { id: "price", accessorKey: "price", header: "Price ($)" },
  {
    id: "costumerRelationInfo",
    accessorKey: "costumerRelationInfo",
    header: "Customer Info",
    cell: ({ row }) =>
      row.original?.costumerRelationInfo ? (
        <Card className="w-56">
          <CardContent>{row.original.costumerRelationInfo}</CardContent>
        </Card>
      ) : (
        "-"
      ),
  },
  {
    id: "settlementStatus",
    accessorKey: "settlementStatus",
    header: "Settlement Status",
    cell: ({ row }) => <Badge>{row.original?.settlementStatus}</Badge>,
  },
  {
    id: "invoiceStatus",
    accessorKey: "invoiceStatus",
    header: "Invoice Status",
    cell: ({ row }) => <Badge>{row.original?.invoiceStatus}</Badge>,
  },
  {
    id: "sampleStatus",
    accessorKey: "sampleStatus",
    header: "Sample Status",
    cell: ({ row }) => <Badge>{row.original?.sampleStatus}</Badge>,
  },
  { id: "sendSeries", accessorKey: "sendSeries", header: "Send Series" },
];

function DataTable({ data }: { data: DataTableRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DataTable;
