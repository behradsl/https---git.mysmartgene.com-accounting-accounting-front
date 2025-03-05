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
  useRegistryExportEmpty,
  useRegistryFinalize,
  useRegistryImportXlsx,
  useRegistryPreviewExportAll,
  useUpdatePreviewRegistry,
} from "@/hooks/api";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DownloadIcon, UploadIcon } from "lucide-react";
import {
  InvoiceStatus,
  RegistryEntity,
  RegistryFieldAccessType,
  SampleStatus,
  SettlementStatus,
} from "@/types/registry-entity.type";
import {
  registryColumns,
  registryColumnsStructure,
  RegistryDataTableRow,
} from "@/view/registry/registry-list/registry-table-columns.data";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import { removeEmptyObjectsByKeys } from "@/utilities/object";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

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
  const { trigger: RegistryFinalizeCallback } = useRegistryFinalize();

  const { trigger: updatePreviewRegistryCallback } = useUpdatePreviewRegistry();
  const { downloadData } = useRegistryPreviewExportAll();
  const { uploadFile } = useRegistryImportXlsx();
  const { downloadData: downloadEmptyExport } = useRegistryExportEmpty();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editedRows, setEditedRows] = useState<
    Record<string, Partial<RegistryDataTableRow>>
  >({ selectedRows: {} });

  const memoizedData = useMemo(() => data, [data]);

  const accessibleColumns = useMemo(
    () => fieldAccesses?.filter(({ access }) => ["VISIBLE", "EDITABLE"].includes(access)).map(({ registryField }) => registryField),
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
                    if (table?.getSelectedRowModel().rows.length) {
                      const { registryCreatedBy, updatedBy, ...values } =
                        editedRows.selectedRows || {};
                      for (
                        let idx = 0;
                        idx < table?.getSelectedRowModel().rows.length;
                        idx++
                      ) {
                        const element = table?.getSelectedRowModel().rows[idx];
                        const { registryCreatedBy, updatedBy, ...rowValues } =
                          element.original;
                        const newRegistry = await updatePreviewRegistryCallback(
                          {
                            ...(removeEmptyObjectsByKeys(
                              rowValues,
                            ) as unknown as RegistryEntity),
                            ...(removeEmptyObjectsByKeys(
                              values,
                            ) as unknown as RegistryEntity),
                            id: element.original.id,
                          },
                        );

                        reloadRegistriesList();
                      }
                      setEditedRows({ selectedRows: {} });
                    } else {
                      const { registryCreatedBy, updatedBy, ...values } =
                        editedRows[row.id];
                      const newRegistry = await updatePreviewRegistryCallback({
                        ...(removeEmptyObjectsByKeys(
                          values,
                        ) as unknown as RegistryEntity),
                      });
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                      reloadRegistriesList();
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
                    if (table?.getSelectedRowModel().rows.length)
                      setEditedRows({ selectedRows: {} });
                    else
                      setEditedRows((prevEditedRows) => {
                        const { [row.id]: _, ...rest } = prevEditedRows;
                        return rest;
                      });
                  }}>
                  {table?.getSelectedRowModel().rows.length
                    ? "Cancel All"
                    : "CAncel"}
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
                    if (table?.getSelectedRowModel().rows.length) {
                      const { registryCreatedBy, updatedBy, ...values } =
                        editedRows.selectedRows || {};
                      for (
                        let idx = 0;
                        idx < table?.getSelectedRowModel().rows.length;
                        idx++
                      ) {
                        const element = table?.getSelectedRowModel().rows[idx];
                        await RegistryFinalizeCallback({
                          id: element.original.id,
                        });
                        reloadRegistriesList();
                      }
                    } else {
                      await RegistryFinalizeCallback({ id: row.original.id });
                      reloadRegistriesList();
                    }
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
          ? "selectedRows"
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
        sampleStatus: {
          type: "select",
          options: Object.keys(SampleStatus).map((sampleStatus) => ({
            label: sampleStatus.replace(/_/g, " "),
            value: sampleStatus,
          })),
        },
        invoiceStatus: {
          type: "select",
          options: Object.keys(InvoiceStatus).map((invoiceStatus) => ({
            label: invoiceStatus.replace(/_/g, " "),
            value: invoiceStatus,
          })),
        },
        settlementStatus: {
          type: "select",
          options: Object.keys(SettlementStatus).map((settlementStatus) => ({
            label: settlementStatus.replace(/_/g, " "),
            value: settlementStatus,
          })),
        },
        laboratoryId: {
          type: "select",
          options: laboratories?.data?.map((laboratory) => ({
            label: laboratory?.name,
            value: laboratory?.id,
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
          <Button
            variant='outline'
            className=''
            onClick={() => downloadEmptyExport()}>
            Export Template <DownloadIcon />
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
      <div className='flex justify-end items-center gap-3 my-12'>
        <Label className='text-nowrap'>Import Data:</Label>
        <Input
          type='file'
          className='w-56'
          placeholder='Import Registries'
          onChange={(e) => {
            if (e.currentTarget.files)
              toast.promise(uploadFile(e.currentTarget.files[0]), {
                error: () => {
                  e.currentTarget.setAttribute("type", "text");
                  e.currentTarget.setAttribute("type", "file");
                  return "Error uploading file";
                },
                success: () => {
                  e.currentTarget.setAttribute("type", "text");
                  e.currentTarget.setAttribute("type", "file");
                  return "File uploaded successfully";
                },
              });
          }}
        />
      </div>
    </>
  );
}

export default RegistryPreviewTableView;
