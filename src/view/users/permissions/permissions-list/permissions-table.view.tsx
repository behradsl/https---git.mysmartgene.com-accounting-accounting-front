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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  permissionsColumns,
  permissionsColumnsStructure,
  PermissionsDataTableRow,
} from "./permissions-table-columns.data";
import { AccessType } from "@/types/registry-entity.type";

function PermissionsTableView({ data }: { data: PermissionsDataTableRow[] }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<PermissionsDataTableRow>>
  >({ selectedRows: {} });
  console.log({ data, permissionsColumnsStructure });

  const table = useReactTable({
    data,
    columns: [
      ...permissionsColumns(permissionsColumnsStructure),
      {
        id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            <Button
              variant={"ghost"}
              size={"sm"}
              className='text-gray-700 border-1 border-transparent hover:border-gray-700/20 hover:text-gray-700'
              onClick={() =>
                router.push(
                  `/panel/users/permissions/assign/${row.original.position}`,
                )
              }>
              Edit
            </Button>
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
        console.log({ editedRows });

        const rowId = table?.getSelectedRowModel().rows.length
          ? "selectedRows"
          : table.getRowModel().rows[rowIndex]?.id;
        if (rowId) {
          setEditedRows((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              [columnId]: value as AccessType,
            },
          }));
        }
      },
      editableCellOptions: {
        accessType: {
          type: "select",
          options: Object.keys(AccessType).map((sampleType) => ({
            label: sampleType.replace(/_/g, " "),
            value: sampleType,
          })),
        },
      },
      editedRows,
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
              key={`${row.id}-${Math.random() * 100000}`}
              data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={`${cell.id}-${Math.random() * 100000}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              // colSpan={registryColumns.length}
              className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PermissionsTableView;
