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
import {
  userColumns,
  UserDataTableRow,
  userColumnsStructure,
} from "./users-table-columns.data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/api";
import { useUser } from "@/store/user.store";
import UserUpdateDialogView from "../user-update/user-update-dialog.view";
import { UserPosition } from "@/types/user-entity.type";

function UsersTableView({
  data,
  reloadUsersList,
}: {
  data: UserDataTableRow[];
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
      ...userColumns(userColumnsStructure),
      {
        id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            <UserUpdateDialogView
              userId={row.original.id}
              onClose={reloadUsersList}
            />
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
    meta: {
      // updateData: (
      //   rowIndex: number,
      //   columnId: string,
      //   value: string | boolean | number,
      // ) => {
      //   console.log({ editedRows });
      //   const rowId = table?.getSelectedRowModel().rows.length
      //     ? "selectedRows"
      //     : table.getRowModel().rows[rowIndex]?.id;
      //   if (rowId) {
      //     setEditedRows((prev) => ({
      //       ...prev,
      //       [rowId]: {
      //         ...prev[rowId],
      //         [columnId]: value,
      //       },
      //     }));
      //   }
      // },
      editableCellOptions: {
        position: {
          type: "select",
          options: Object.keys(UserPosition).map((UserPosition) => ({
            label: UserPosition.replace(/_/g, " "),
            value: UserPosition,
          })),
        },
      },
      editedRows: {},
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
