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
import { useRouter } from "next/navigation";
import {
  LaboratoriesDataTableRow,
  laboratoriesColumns,
  laboratoriesColumnsStructure,
} from "./laboratories-table-columns.data";
import {
  LaboratoriesType,
  LaboratoryEntity,
  PaymentType,
} from "@/types/laboratory-entity.type";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import { useUser } from "@/store/user.store";
import { UserPosition } from "@/types/user-entity.type";
import {
  useUpdateLaboratory,
  useDeleteLaboratory,
} from "@/hooks/api/use-laboratory.hook";
import { toast } from "sonner";

function LaboratoriesTableView({
  data,
  reloadLaboratoriesList,
  pageSize = 0,
  setPageSize,
  currentPage = 1,
  setCurrentPage,
  setSortBy,
  allItemsCount = 0,
}: {
  data: LaboratoriesDataTableRow[];
  reloadLaboratoriesList: () => void;

  allItemsCount?: number;
  pageSize?: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  currentPage?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sortBy?: { direction: "asc" | "desc"; columnId: string };
  setSortBy: Dispatch<
    SetStateAction<{ direction: "asc" | "desc"; columnId: string }>
  >;
}) {
  const user = useUser((state) => state.user);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Store edited rows state - crucial for inline editing
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<LaboratoriesDataTableRow>>
  >({ selectedRows: {}, bulk: {} });

  // Hook for updating and deleting laboratories
  const { trigger: updateLaboratoryCallback } = useUpdateLaboratory();

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: [
      ...laboratoriesColumns(laboratoriesColumnsStructure),
      {
        id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            {/* Toggle edit mode if a row is being edited */}
            {editedRows[row.id] ? (
              <>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-green-700 border-1 border-transparent hover:border-green-700/20 hover:text-green-700'
                  onClick={async () => {
                    try {
                      const selectedTableRows =
                        table?.getSelectedRowModel().rows;
                      // Extract the data to update, excluding properties we don't want to send
                      const {
                        accountManager,
                        createdBy,
                        LaboratoryFormalPaymentInfo,
                        id,
                        createdAt,
                        updatedAt,
                        ...values
                      } = selectedTableRows.length
                        ? editedRows["bulk"]
                        : editedRows[row.id];

                      // Collect IDs of selected rows
                      const ids = new Set<string>();
                      if (selectedTableRows.length) {
                        table
                          ?.getSelectedRowModel()
                          .rows.forEach((row) => ids.add(row.original.id));
                      } else {
                        ids.add(row.original.id);
                      }

                      // Process updates one by one
                      if (ids.size > 1) {
                        // Handle bulk update
                        for (const id of ids) {
                          await updateLaboratoryCallback({
                            ...(removeEmptyObjectsByKeys(
                              values,
                            ) as unknown as Omit<LaboratoryEntity, "id">),
                            id: id,
                          });
                        }
                        toast.success(
                          `Updated ${ids.size} laboratories successfully`,
                        );
                      } else {
                        // Handle single update
                        await updateLaboratoryCallback({
                          ...(removeEmptyObjectsByKeys(
                            values,
                          ) as unknown as Omit<LaboratoryEntity, "id">),
                          id: row.original.id,
                        });
                        toast.success("Laboratory updated successfully");
                      }

                      reloadLaboratoriesList();
                      // Clean up edited rows state after successful update
                      if (selectedTableRows.length) {
                        setEditedRows({ selectedRows: {}, bulk: {} });
                      } else {
                        setEditedRows((prevEditedRows) => {
                          const { [row.id]: _, ...rest } = prevEditedRows;
                          return rest;
                        });
                      }
                    } catch (error) {
                      toast.error("Failed to update laboratory data");
                      console.error(error);
                    }
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
                    // Cancel edit mode and discard changes
                    if (table?.getSelectedRowModel().rows.length)
                      setEditedRows({ selectedRows: {}, bulk: {} });
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
    },
    // Meta object provides utilities for inline editing
    meta: {
      // updateData is called when a cell's value changes
      updateData: (
        rowIndex: number,
        columnId: string,
        value: string | boolean | number,
      ) => {
        const selectedTableRows = table?.getSelectedRowModel().rows;
        // If rows are selected, update the bulk edit state
        if (selectedTableRows.length) {
          setEditedRows((prev) => ({
            ...prev,
            bulk: {
              ...prev.bulk,
              [columnId]: value,
            },
          }));
        }
        // Otherwise update the specific row
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
      // Options for select fields in the table
      editableCellOptions: {
        type: {
          type: "select",
          options: Object.keys(LaboratoriesType).map((type) => ({
            label: type.replace(/_/g, " "),
            value: type,
          })),
        },
        paymentType: {
          type: "select",
          options: Object.keys(PaymentType).map((paymentType) => ({
            label: paymentType.replace(/_/g, " "),
            value: paymentType,
          })),
        },
      },
      // Reference to current edited rows state for cell rendering
      editedRows,
    },
  });

  // Update sort state for backend sorting
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
  }, [table.getState().sorting, setSortBy]);

  return (
    <>
      <div className='w-full flex justify-end items-center my-3'>
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
                const columnStructure = laboratoriesColumnsStructure?.find(
                  ({ id, alternativeId }) => {
                    return id === column.id || alternativeId === column.id;
                  },
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
                          header.getContext(),
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
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={laboratoriesColumnsStructure.length + 1}
                className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <span className='text-xs text-gray-500'>
            page {currentPage} of{" "}
            {Math.ceil(Number(allItemsCount) / Number(pageSize))} ({pageSize}{" "}
            items per page)
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={
              currentPage >= Math.ceil(Number(allItemsCount) / Number(pageSize))
            }>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default LaboratoriesTableView;
