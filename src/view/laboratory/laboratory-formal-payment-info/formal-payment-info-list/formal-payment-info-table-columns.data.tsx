import { type ColumnDef } from "@tanstack/react-table"
import type { UserPosition } from "@/types/user-entity.type"

export type SettlementStatus = "SETTLED" | "PENDING" | "OVERDUE"
export type InvoiceStatus = "ISSUED" | "NOT_ISSUED"
export type SampleStatus =
  | "PENDING"
  | "SHIPMENT"
  | "SHIPPED"
  | "RECEIVED_AT_laboratory"
  | "IN_TESTING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED"

export type FormalPaymentInfoDataTableRow = {
  id: string
  email: string
  // LaboratoryAccountManager: { id: string }[]
  // LaboratoryCreatedBy: { id: string }[]
  // RegistryCreatedBy: { id: string }[]
  // RegistryUpdatedBy: { id: string }[]
  phoneNumber: string
  name: string
  position: UserPosition
  createdAt: string
  removedAt?: null
}

export const userColumns: ColumnDef<FormalPaymentInfoDataTableRow>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className='w-20 font-semibold'>{row.original.name}</div>
    )
  },
  {
    id: "Email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className='w-20 font-semibold'>{row.original.email}</div>
    )
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className='w-20 font-semibold'>{row.original.phoneNumber}</div>
    )
  },
  {
    id: "position",
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className='w-20 font-semibold'>{row.original.position}</div>
    )
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className='w-20 font-semibold'>{row.original.createdAt}</div>
    )
  }
]
