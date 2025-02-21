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
import { userColumns, UsersDataTableRow } from "./users-table-columns.data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/api";
import { useUser } from "@/store/user.store";

function UsersTableView({
  data,
  reloadUsersList,
}: {
  data: UsersDataTableRow[];
  reloadUsersList: () => void;
}) {
  const { user } = useUser();
  const router = useRouter();
  const { trigger: userDeleteCallback } = useDeleteUser();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: [
      ...userColumns,
      {
        id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            <Button
              variant={"outline"}
              onClick={() =>
                router.push(`/panel/users/update/${row.original.id}`)
              }>
              Edit
            </Button>
            {user?.id === row.original.id ? null : (
              <Button
                variant={"destructive"}
                onClick={async () => {
                  await userDeleteCallback({ id: row.original.id });
                  reloadUsersList();
                }}>
                Remove
              </Button>
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
  });
  return (
    <Table className='w-full'>
      <TableHeader className=''>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className='!hover:bg-white data-[state=selected]:bg-white'>
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
              colSpan={userColumns.length}
              className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default UsersTableView;
