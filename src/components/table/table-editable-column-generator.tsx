import {
  CellContext,
  HeaderContext,
  type ColumnDef,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckIcon, MoveDown, MoveUp, XIcon } from "lucide-react";
import clsx from "clsx";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/datepicker";

const dataTableColumnGenerator = <T = Record<string, any>,>(
  rowKeys: {
    id: string;
    alternativeId?: string;
    title: string;
    readonly?: boolean;
    dataType:
      | "text"
      | "number"
      | "date"
      | "switch"
      | "select"
      | "action"
      | "user";
    cell?: (cell: CellContext<T, unknown>) => ReactNode;
  }[],
): ColumnDef<T>[] => {
  return [
    {
      id: "checkSelect",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...rowKeys.map(
      ({
        id,
        alternativeId,
        title,
        cell: cellCallback,
        dataType,
        readonly = false,
      }) => {
        return {
          id: id,
          accessorKey: id as string,
          enableSorting: true,
          enableHiding: true,
          header: ({ column }: HeaderContext<T, unknown>) => {
            return (
              <Button
                variant='ghost'
                onClick={() => column.toggleSorting()}
                className='w-full justify-start px-1'>
                {title || id}
                <span className='flex items-center scale-75'>
                  <MoveUp
                    className={clsx(
                      "-mx-1",
                      column.getIsSorted() === "asc" ? "" : "opacity-10",
                    )}
                  />
                  <MoveDown
                    className={clsx(
                      "-mx-1",
                      column.getIsSorted() === "desc" ? "" : "opacity-10",
                    )}
                  />
                </span>
              </Button>
            );
          },
          cell: (ctx: CellContext<T, unknown>) => {
            if (cellCallback) return cellCallback(ctx);
            const selectedRows = ctx.table?.getSelectedRowModel();
            const {
              table: {
                options: { meta },
              },
              column: { id: columnId },
              row: { index: rowIndex, id: rowId },
            } = ctx;

            const isRowsSelected = selectedRows.rows.length > 0;
            //@ts-ignore no types!
            const isEditMode = Object.keys(meta?.editedRows).includes(
              //@ts-ignore no types!
              ctx.row.original.id,
            );
            const isRowSelected = selectedRows.rows.findIndex(
              (row) => row.id === ctx.row.id,
            );
            //@ts-ignore no types!
            const editDetails = meta?.editedRows?.[
              isRowSelected > -1 && isEditMode ? "selectedRows" : rowId
            ] as Record<string, string | number | boolean>;

            //@ts-ignore no types!
            const cellOptions = meta?.editableCellOptions?.[
              alternativeId || columnId
            ]?.options as {
              label: string;
              value: string;
            }[];
            //@ts-ignore no types!
            const onBlurUpdate = meta?.updateData as (
              rowIndex: number,
              columnId: string,
              value: string | boolean | number,
            ) => void;

            switch (dataType) {
              case "text":
                const stringData = alternativeId
                  ? (ctx.row.original as Record<string, any>)[alternativeId]
                  : ctx.cell.getValue<string>();
                if (editDetails && !readonly)
                  return (
                    <Input
                      autoComplete='off'
                      defaultValue={
                        (editDetails[alternativeId || columnId] as string) || ""
                      }
                      type='text'
                      onBlur={(e) => {
                        onBlurUpdate(
                          rowIndex,
                          alternativeId || columnId,
                          e.currentTarget.value,
                        );
                      }}
                    />
                  );
                return <span>{stringData ? stringData : "---"}</span>;
              case "number":
                const numberData = alternativeId
                  ? (ctx.row.original as Record<string, any>)[alternativeId]
                  : ctx.cell.getValue<number>();
                if (editDetails && !readonly)
                  return (
                    <Input
                      autoComplete='off'
                      defaultValue={
                        (editDetails[alternativeId || columnId] as string) || ""
                      }
                      type='text'
                      onBlur={(e) => {
                        onBlurUpdate(
                          rowIndex,
                          alternativeId || columnId,
                          e.currentTarget.value,
                        );
                      }}
                    />
                  );
                return (
                  <span>
                    {numberData
                      ? Number(numberData).toLocaleString("en-US")
                      : "---"}
                  </span>
                );
              case "switch":
                const switchData = alternativeId
                  ? (ctx.row.original as Record<string, any>)[alternativeId]
                  : ctx.cell.getValue<boolean>();
                if (editDetails && !readonly)
                  return (
                    <Switch
                      className='mx-2'
                      defaultChecked={
                        (editDetails[alternativeId || columnId] as boolean) ||
                        false
                      }
                      onCheckedChange={(e) =>
                        onBlurUpdate(rowIndex, alternativeId || columnId, e)
                      }
                    />
                  );
                return (
                  <Badge
                    variant={"outline"}
                    className={clsx(
                      "text-xs mx-auto flex justify-center",
                      switchData
                        ? "text-green-700 border-green-700/10"
                        : "text-red-600 bg-red-600/5 border-red-600/10",
                    )}>
                    {switchData ? (
                      <>
                        <CheckIcon />
                        Not Processed
                      </>
                    ) : (
                      <>
                        <XIcon />
                        Processed
                      </>
                    )}
                  </Badge>
                );

              case "select":
                const selectData = alternativeId
                  ? (ctx.row.original as Record<string, any>)[alternativeId]
                  : ctx.cell.getValue<string>();
                const selectedOption = cellOptions?.find(
                  (option) => option.value === selectData,
                );

                if (editDetails && !readonly)
                  return (
                    <Select
                      onValueChange={(e) =>
                        onBlurUpdate(rowIndex, alternativeId || columnId, e)
                      }
                      value={
                        (editDetails[alternativeId || columnId] as string) || ""
                      }
                      dir='rtl'>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a laboratory' />
                      </SelectTrigger>

                      <SelectContent
                        ref={(ref) =>
                          // Temporary workaround from https://github.com/shadcn-ui/ui/issues/1220
                          ref?.addEventListener("touchend", (e) =>
                            e.preventDefault(),
                          )
                        }>
                        {cellOptions?.map(({ label, value }) => (
                          <SelectItem
                            key={`${
                              alternativeId || columnId
                            }-${rowIndex} - ${value}`}
                            value={value}>
                            {label || value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                return (
                  <Badge className='' variant={"outline"}>
                    {selectedOption ? selectedOption.label : "---"}
                  </Badge>
                );

              case "date":
                const dateData = alternativeId
                  ? (ctx.row.original as Record<string, any>)[alternativeId]
                  : ctx.cell.getValue<string>();
                if (editDetails && !readonly)
                  return (
                    <DatePicker
                      onChange={(date) =>
                        onBlurUpdate(
                          rowIndex,
                          alternativeId || columnId,
                          (date as Date).toISOString(),
                        )
                      }
                      value={
                        (editDetails[alternativeId || columnId] as string)
                          ? new Date(
                              editDetails[alternativeId || columnId] as string,
                            )
                          : undefined
                      }
                      className='w-full'
                    />
                  );
                return (
                  <Badge className='' variant={"outline"}>
                    {dateData
                      ? new Date(dateData).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })
                      : "---"}
                  </Badge>
                );

              case "user":
                const userData = alternativeId
                  ? ((ctx.row.original as Record<string, any>)[
                      alternativeId
                    ] as {
                      id: string;
                      name: string;
                      email: string;
                      position: string;
                    })
                  : ctx.cell.getValue<{
                      id: string;
                      name: string;
                      email: string;
                      position: string;
                    }>();

                return userData ? (
                  <div className='w-full flex justify-center items-center gap-2'>
                    <Avatar>
                      <AvatarFallback>
                        {userData.name
                          ?.split(" ")
                          .slice(0, 2)
                          .map((name) => name[0].toUpperCase())
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-2'>
                      <span className='text-xs font-bold text-gray-800'>
                        {userData.name}
                      </span>
                      <span className='text-xs'>{userData.email}</span>
                    </div>
                  </div>
                ) : (
                  <span className='w-full flex justify-center items-center'>
                    ---
                  </span>
                );

              default:
                break;
            }
          },
        };
      },
    ),
  ];
};

export { dataTableColumnGenerator };
