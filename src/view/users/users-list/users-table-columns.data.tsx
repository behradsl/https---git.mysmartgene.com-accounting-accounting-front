import { type ColumnDef } from "@tanstack/react-table";
import type { UserPosition } from "@/types/user-entity.type";
import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";

export type UserDataTableRow = {
  id: string;
  email: string;
  // LaboratoryAccountManager: { id: string }[]
  // LaboratoryCreatedBy: { id: string }[]
  // RegistryCreatedBy: { id: string }[]
  // RegistryUpdatedBy: { id: string }[]
  phoneNumber: string;
  name: string;
  position: UserPosition;
  createdAt: string;
  removedAt?: null;
};

export const userColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<UserDataTableRow>
>[0] = [
  { id: "name", title: "Full Name", dataType: "text", readonly: true },
  { id: "email", title: "Email", dataType: "text", readonly: true },
  {
    id: "phoneNumber",
    title: "Phone Number",
    dataType: "text",
    readonly: true,
  },
  { id: "position", title: "position", dataType: "select", readonly: true },

  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
];

export const userColumns = (columnsStructure: typeof userColumnsStructure) => {
  return dataTableColumnGenerator(columnsStructure);
};
