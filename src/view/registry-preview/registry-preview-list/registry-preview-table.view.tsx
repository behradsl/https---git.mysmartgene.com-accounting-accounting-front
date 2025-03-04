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

import { useState, useMemo } from "react";
import {
  PreviewDataTableRow,
  registryColumns,
} from "./registry-preview-table-columns.data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRegistryFinalize } from "@/hooks/api";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SampleStatus } from "@/types/registry-entity.type";

function RegistryPreviewTableView({
  data,
  reloadRegistriesList,
}: {
  data: PreviewDataTableRow[];
  reloadRegistriesList: () => void;
}) {
  const router = useRouter();
  const { trigger: RegistryFinalizeCallback } = useRegistryFinalize();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<PreviewDataTableRow>>
  >({});

  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: [
      ...registryColumns,
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
                    console.log(editedRows[row.id]);
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
                    // Use a functional update for editedRows to ensure you're working with the latest state.
                    setEditedRows((prevEditedRows) => ({
                      ...prevEditedRows,
                      [row.id]: { ...row.original },
                    }));
                  }}>
                  Edit
                </Button>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className='text-primary border-1 border-transparent hover:border-primary/20 hover:text-primary'
                  onClick={async () => {
                    await RegistryFinalizeCallback({ id: row.original.id });
                    reloadRegistriesList();
                  }}>
                  Finalize
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      updateData: (
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
      editableCellOptions: {
        sampleStatus: {
          type: "select",
          options: Object.keys(SampleStatus).map((sampleStatus) => ({
            label: sampleStatus.replace(/_/g, " "),
            value: sampleStatus,
          })),
        },
        settlementStatus: {
          type: "select",
          options: Object.keys(SampleStatus).map((sampleStatus) => ({
            label: sampleStatus.replace(/_/g, " "),
            value: sampleStatus,
          })),
        },
      },
      editedRows,
    },
  });
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
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
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
                colSpan={registryColumns.length}
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
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegistryPreviewTableView;
