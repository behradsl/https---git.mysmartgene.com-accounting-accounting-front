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
import { useState, useMemo, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DownloadIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InvoiceCurrencyType,
  LaboratoryInvoiceStatusType,
} from "@/types/laboratory-invoice.type";
import {
  laboratoryInvoicesColumns,
  laboratoryInvoicesColumnsStructure,
  LaboratoryInvoicesDataTableRow,
} from "./laboratory-invoices-table-columns.data";
import {
  useLaboratoryInvoiceExportAll,
  useUpdateLaboratoryInvoice,
  useLaboratoryInvoiceIssuance,
  useLaboratoryInvoiceCancellation,
} from "@/hooks/api/use-laboratory-invoice.hook";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import { toast } from "sonner";
import LaboratoryInvoicePaymentsDialogView from "../laboratory-invoice-payments/laboratory-invoice-payments-dialog.view";

interface LaboratoryInvoicesTableViewProps {
  data: LaboratoryInvoicesDataTableRow[];
  reloadInvoicesList: () => void;
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

const LaboratoryInvoicesTableView = ({
  data,
  reloadInvoicesList,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  sortBy,
  setSortBy,
  allItemsCount,
}: LaboratoryInvoicesTableViewProps) => {
  const { downloadData: downloadInvoiceExport } =
    useLaboratoryInvoiceExportAll();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<LaboratoryInvoicesDataTableRow>>
  >({ selectedRows: {}, bulk: {} });

  const { trigger: updateInvoiceCallback } = useUpdateLaboratoryInvoice();
  const { trigger: issuanceCallback } = useLaboratoryInvoiceIssuance();
  const { trigger: cancellationCallback } = useLaboratoryInvoiceCancellation();

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: [
      ...laboratoryInvoicesColumns(laboratoryInvoicesColumnsStructure),
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
                    try {
                      const {
                        invoiceDate,
                        paymentDueDate,
                        usdExchangeRate,
                        notes,
                      } = editedRows[row.id];

                      await updateInvoiceCallback({
                        ...(removeEmptyObjectsByKeys({
                          invoiceDate,
                          paymentDueDate,
                          usdExchangeRate,
                          LaboratoryInvoiceId: row.original.LaboratoryInvoiceId,
                          notes,
                        }) as unknown as Partial<LaboratoryInvoicesDataTableRow>),
                        id: row.original.id,
                      });
                      toast.success("Invoice updated successfully");
                      reloadInvoicesList();
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                    } catch (error) {
                      toast.error("Failed to update invoice data");
                      console.error(error);
                    }
                  }}>
                  Save
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-red-700 border-1 border-transparent hover:border-red-700/20 hover:text-red-700'
                  onClick={() => {
                    setEditedRows((prevEditedRows) => {
                      const { [row.id]: _, ...rest } = prevEditedRows;
                      return rest;
                    });
                  }}>
                  Cancel
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

                {[
                  LaboratoryInvoiceStatusType.ISSUED,
                  LaboratoryInvoiceStatusType.PAID,
                ].includes(row.original.status) && (
                  <LaboratoryInvoicePaymentsDialogView
                    invoiceId={row.original.id}
                    invoiceNumber={row.original.invoiceNumber}
                    totalUsdPrice={row.original.totalUsdPrice}
                    outstandingAmount={row.original.outstandingAmount}
                    onClose={reloadInvoicesList}
                  />
                )}

                {row.original.status === LaboratoryInvoiceStatusType.DRAFT && (
                  <>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className='text-primary border-1 border-transparent hover:border-primary/20 hover:text-primary'
                      onClick={async () => {
                        try {
                          await issuanceCallback({ id: row.original.id });
                          toast.success("Invoice issued successfully");
                          reloadInvoicesList();
                        } catch (error) {
                          toast.error("Failed to issue invoice");
                          console.error(error);
                        }
                      }}>
                      Issue
                    </Button>
                  </>
                )}

                {[LaboratoryInvoiceStatusType.DRAFT].includes(
                  row.original.status,
                ) && (
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='text-destructive border-1 border-transparent hover:border-destructive/20 hover:text-destructive'
                    onClick={async () => {
                      try {
                        await cancellationCallback({ id: row.original.id });
                        toast.success("Invoice cancelled successfully");
                        reloadInvoicesList();
                      } catch (error) {
                        toast.error("Failed to cancel invoice");
                        console.error(error);
                      }
                    }}>
                    Cancel
                  </Button>
                )}
              </>
            )}
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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
    pageCount: Math.ceil(allItemsCount / pageSize),
    manualPagination: true,
    meta: {
      updateData: async (
        rowIndex: number,
        columnId: string,
        value: string | boolean | number,
      ) => {
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

      editedRows,
      editableCellOptions: {
        status: {
          type: "select",
          options: Object.keys(LaboratoryInvoiceStatusType).map(
            (sampleType) => ({
              label: sampleType.replace(/_/g, " "),
              value: sampleType,
            }),
          ),
        },
        currency: {
          type: "select",
          options: Object.entries(InvoiceCurrencyType).map(([key, value]) => ({
            label: key.replace(/_/g, " "),
            value: value,
          })),
        },
        paymentStatus: {
          type: "select",
          options: Object.keys(LaboratoryInvoiceStatusType).map(
            (sampleType) => ({
              label: sampleType.replace(/_/g, " "),
              value: sampleType,
            }),
          ),
        },
      },
    },
  });

  useEffect(() => {
    if (table.getState().sorting.length) {
      setSortBy({
        columnId: table.getState().sorting[0].id,
        direction: table.getState().sorting[0].desc ? "desc" : "asc",
      });
    } else {
      setSortBy({
        columnId: "createdAt",
        direction: "desc",
      });
    }
  }, [table.getState().sorting]);

  return (
    <>
      <div className='w-full flex justify-end gap-3 items-center my-3'>
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
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            variant='outline'
            className=''
            onClick={() =>
              downloadInvoiceExport({
                ids: table
                  ?.getSelectedRowModel()
                  .rows.map(({ original }) => original.id),
              })
            }>
            Export All <DownloadIcon className='ml-2 h-4 w-4' />
          </Button>
        </div>
        <DropdownMenu modal>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns Visibility <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnStructure =
                  laboratoryInvoicesColumnsStructure?.find(
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
                  colSpan={laboratoryInvoicesColumnsStructure.length}
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
    </>
  );
};

export default LaboratoryInvoicesTableView;
