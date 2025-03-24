"use client";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  InvoiceCurrencyType,
  LaboratoryInvoicePaymentCreateEntity,
  LaboratoryInvoicePaymentEntity,
} from "@/types/laboratory-invoice.type";
import {
  laboratoryPaymentColumns,
  laboratoryPaymentColumnsStructure,
  LaboratoryPaymentDataTableRow,
} from "./laboratory-payments-table-columns.data";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import { useUpdateLaboratoryInvoicePayment } from "@/hooks/api/use-laboratory-invoice.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LaboratoryPaymentsTableViewProps {
  data: LaboratoryPaymentDataTableRow[];
  reloadPaymentsList: () => void;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sortBy: { direction: "asc" | "desc"; columnId: string };
  setSortBy: Dispatch<
    SetStateAction<{ direction: "asc" | "desc"; columnId: string }>
  >;
  allItemsCount: number;
}

const LaboratoryPaymentsTableView = ({
  data,
  reloadPaymentsList,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  sortBy,
  setSortBy,
  allItemsCount,
}: LaboratoryPaymentsTableViewProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<LaboratoryPaymentDataTableRow>>
  >({});
  const { trigger: updatePaymentCallback } =
    useUpdateLaboratoryInvoicePayment();

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: [
      ...laboratoryPaymentColumns(laboratoryPaymentColumnsStructure),
      {
        id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            {editedRows[row.id] ? (
              <>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-green-700 border-1 border-transparent hover:border-green-700/20 hover:text-green-700'
                  onClick={async () => {
                    const selectedTableRows = table?.getSelectedRowModel().rows;
                    const { id, amountPaid, currency, paymentDate, notes } =
                      selectedTableRows.length
                        ? editedRows["bulk"]
                        : editedRows[row.id];

                    reloadPaymentsList();
                    const ids = new Set<string>();
                    table
                      ?.getSelectedRowModel()
                      .rows.forEach((row) => ids.add(row.original.id));
                    if (!selectedTableRows.length) {
                      ids.add(row.original.id);
                    }
                      await updatePaymentCallback({
                      ...(removeEmptyObjectsByKeys({
                        id,
                        amountPaid,
                        currency,
                        paymentDate,
                        LaboratoryInvoiceId: row.original.LaboratoryInvoiceId,
                        notes,
                      }) as Partial<LaboratoryInvoicePaymentCreateEntity>),
                      id,
                    });
                    if (selectedTableRows.length) {
                      setEditedRows({});
                    } else {
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                    }

                    reloadPaymentsList();
                  }}>
                  {table?.getSelectedRowModel().rows.length
                    ? "Save All"
                    : "Save"}
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-red-700 border-1 border-transparent hover:border-red-700/20 hover:text-red-700'
                  onClick={() => {
                    if (table?.getSelectedRowModel().rows.length)
                      setEditedRows({});
                    else
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                  }}>
                  {table?.getSelectedRowModel().rows.length
                    ? "Cancel All"
                    : "Cancel"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-gray-700 border-1 border-transparent hover:border-gray-700/20 hover:text-gray-700'
                  onClick={() => {
                    setEditedRows((prevEditedRows) => ({
                      ...prevEditedRows,
                      [row.id]: { ...removeEmptyObjectsByKeys(row.original) },
                    }));
                  }}>
                  Edit
                </Button>
              </>
            )}
          </div>
        ),
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string | boolean | number,
      ) => {
        const selectedTableRows = table?.getSelectedRowModel().rows;
        if (selectedTableRows.length) {
          setEditedRows((prev) => ({
            ...prev,
            bulk: {
              ...prev.bulk,
              [columnId]: value,
            },
          }));
        }
        const rowId = table.getRowModel().rows[rowIndex]?.id;
        if (rowId) {
          setEditedRows((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              [columnId]: value,
            },
          }));
        }
      },
      editableCellOptions: {
        currency: {
          type: "select",
          options: Object.entries(InvoiceCurrencyType).map(([key, value]) => ({
            value: value,
            label: key,
          })),
        },
      },
      editedRows,
    },
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}>
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenu modal>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns Visibility <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnStructure = laboratoryPaymentColumnsStructure?.find(
                  ({ id }) => id === column.id,
                );
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {columnStructure?.title || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={laboratoryPaymentColumnsStructure.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Page {currentPage} of {Math.ceil(allItemsCount / pageSize)}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= Math.ceil(allItemsCount / pageSize)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryPaymentsTableView;
