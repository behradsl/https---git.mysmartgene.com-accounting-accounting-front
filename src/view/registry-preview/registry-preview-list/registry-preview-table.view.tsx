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
  useRegistryFinalize,
  useRegistryPreviewExportAll,
  useUpdatePreviewRegistry,
  useUserFindManyRestricted,
} from "@/hooks/api";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DownloadIcon } from "lucide-react";
import {
  RegistryEntity,
  RegistryFieldAccessType,
  SampleStatus,
  SampleType,
  SettlementStatus,
} from "@/types/registry-entity.type";
import {
  registryColumns,
  registryColumnsStructure,
  RegistryDataTableRow,
} from "@/view/registry/registry-list/registry-table-columns.data";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import RegistryReviewImportDialogView from "./registry-import-dialog.view";

function RegistryPreviewTableView({
  data,
  reloadRegistriesList,
  fieldAccesses,
  pageSize = 0,
  setPageSize,
  currentPage = 1,
  setCurrentPage,
  sortBy,
  setSortBy,
  allItemsCount = 0,
}: {
  data: RegistryDataTableRow[];
  reloadRegistriesList: () => void;
  fieldAccesses?: RegistryFieldAccessType[];
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
  const { laboratories } = useLaboratoryFindMany();
  const { users } = useUserFindManyRestricted();
  const { trigger: RegistryFinalizeCallback } = useRegistryFinalize();

  const { trigger: updatePreviewRegistryCallback } = useUpdatePreviewRegistry();
  const { downloadData } = useRegistryPreviewExportAll();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<RegistryDataTableRow>>
  >({ bulk: {} });

  const memoizedData = useMemo(() => data, [data]);

  const accessibleColumns = useMemo(
    () =>
      fieldAccesses
        ?.filter(({ access }) => ["VISIBLE", "EDITABLE"].includes(access))
        .map(({ registryField }) => registryField),
    [fieldAccesses],
  );

  const table = useReactTable({
    data: memoizedData,
    columns: [
      ...registryColumns(
        registryColumnsStructure
          .filter(({ id }) =>
            id && accessibleColumns
              ? (accessibleColumns || [])?.includes(id)
              : false,
          )
          .map(({ id, alternativeId, readonly, ...columnStructure }) => {
            const accessType = fieldAccesses?.find(({ registryField }) =>
              [id, alternativeId].includes(registryField),
            );
            return {
              id,
              alternativeId,
              readonly: readonly || accessType?.access === "VISIBLE",
              ...columnStructure,
            };
          }),
      ),
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
                    const {
                      registryCreatedBy,
                      registryUpdatedBy,
                      productPriceUsd,
                      sendSeries,
                      id,
                      ...values
                    } = selectedTableRows.length
                      ? editedRows["bulk"]
                      : editedRows[row.id];

                    reloadRegistriesList();
                    const ids = new Set<string>();
                    table
                      ?.getSelectedRowModel()
                      .rows.forEach((row) => ids.add(row.original.id));
                    ids.add(row.original.id);
                    await updatePreviewRegistryCallback({
                      ...(removeEmptyObjectsByKeys({
                        ...values,
                        sendSeries: sendSeries ? Number(sendSeries) : undefined,
                        productPriceUsd: productPriceUsd
                          ? Number(productPriceUsd)
                          : undefined,
                      }) as unknown as RegistryEntity),
                      ids: [...ids],
                    });
                    if (selectedTableRows.length) {
                      setEditedRows({ bulk: {} });
                    } else {
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                    }

                    reloadRegistriesList();
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
                      setEditedRows({ bulk: {} });
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
                    const ids = new Set<string>();
                    table
                      ?.getSelectedRowModel()
                      .rows.forEach((row) => ids.add(row.original.id));
                    ids.add(row.original.id);

                    await RegistryFinalizeCallback({ ids: [...ids] });
                    reloadRegistriesList();
                  }}>
                  {table?.getSelectedRowModel().rows.length
                    ? "Finalize All"
                    : "Finalize"}
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
    // manualFiltering: true,
    manualSorting: true,
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
          ? "bulk"
          : table.getRowModel().rows[rowIndex]?.id;
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
        laboratoryId: {
          type: "select",
          options: laboratories?.data?.map((laboratory) => ({
            label: laboratory?.name,
            value: laboratory?.id,
          })),
        },
        costumerRelationId: {
          type: "select",
          options: users?.data?.map((user) => ({
            label: user?.name,
            value: user?.id,
          })),
        },
        sampleType: {
          type: "select",
          options: Object.keys(SampleType).map((sampleType) => ({
            label: sampleType.replace(/_/g, " "),
            value: sampleType,
          })),
        },
      },
      editedRows,
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
      <div className='w-full flex justify-end items-center my-3'>
        <div className='flex gap-2'>
          <RegistryReviewImportDialogView />
          <Button
            variant='outline'
            className=''
            onClick={() =>
              downloadData(
                table
                  ?.getSelectedRowModel()
                  .rows.map(({ original }) => original.id),
              )
            }>
            Export All <DownloadIcon />
          </Button>
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
                const columnStructure = registryColumnsStructure?.find(
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

export default RegistryPreviewTableView;
