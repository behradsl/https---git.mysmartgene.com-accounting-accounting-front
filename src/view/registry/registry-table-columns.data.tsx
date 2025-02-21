import { type ColumnDef } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export type DataTableRow = {
  MotId: string
  name: string

  Laboratory: string
  serviceType: string
  kitType: string
  urgentStatus?: boolean
  price: number
  description?: string
  costumerRelationInfo?: string
  KoreaSendDate?:string
  resultReady?: boolean
  resultReadyTime?:string
  settlementStatus: SettlementStatus
  invoiceStatus: InvoiceStatus
  proformaSent?: boolean
  proformaSentDate?:string
  totalInvoiceAmount: number
  installmentOne?: number
  installmentOneDate?:string
  installmentTwo?: number
  installmentTwoDate?:string
  installmentThree?: number
  installmentThreeDate?:string
  totalPaid: number
  settlementDate?:string
  officialInvoiceSent?: boolean
  officialInvoiceSentDate?:string
  sampleStatus: SampleStatus
  sendSeries: string
  createdAt:string
  updatedAt:string

  registryCreatedBy: {
    name: string
    email: string
    position: string
    id: string
  }

  updatedBy: {
    name: string
    email: string
    position: string
    id: string
  }
}

export const registryColumns: ColumnDef<DataTableRow>[] = [
  { id: "MotId", accessorKey: "MotId", header: "MOT ID" },
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "Laboratory", accessorKey: "Laboratory", header: "Laboratory" },
  { id: "serviceType", accessorKey: "serviceType", header: "Service Type" },
  { id: "description", accessorKey: "description", header: "description" },
  {
    id: "kitType",
    accessorKey: "kitType",
    header: "Kit Type",
    cell: ({ row }) => {
      console.log(row)
    }
  },
  {
    id: "urgentStatus",
    accessorKey: "urgentStatus",
    header: "Urgent",
    cell: ({ row }) =>
      row.getValue("urgentStatus") ? (
        <Badge variant='destructive'>Urgent</Badge>
      ) : (
        "Normal"
      )
  },
  { id: "price", accessorKey: "price", header: "Price ($)" },
  {
    id: "costumerRelationInfo",
    accessorKey: "costumerRelationInfo",
    header: "Customer Info",
    cell: ({ row }) =>
      row.original?.costumerRelationInfo ? (
        <Card className='w-56'>
          <CardContent>{row.original.costumerRelationInfo}</CardContent>
        </Card>
      ) : (
        "-"
      )
  },
  {
    id: "settlementStatus",
    accessorKey: "settlementStatus",
    header: "Settlement Status",
    cell: ({ row }) => <Badge>{row.original?.settlementStatus}</Badge>
  },
  {
    id: "KoreaSendDate",
    accessorKey: "KoreaSendDate",
    header: "Korea Send Date",
    cell: ({ row }) => {
      const date = row.original.KoreaSendDate
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },
  {
    id: "installmentOne",
    accessorKey: "installmentOne",
    header: "installmentOne ($)"
  },
  {
    id: "installmentOneDate",
    accessorKey: "installmentOneDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const date = row.original.installmentOneDate
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },
  {
    id: "installmentTwo",
    accessorKey: "installmentTwo",
    header: "installmentTwo ($)"
  },
  {
    id: "installmentTwoDate",
    accessorKey: "installmentTwoDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const date = row.original.installmentOneDate
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },
  {
    id: "installmentThree",
    accessorKey: "installmentThree",
    header: "installmentThree ($)"
  },
  {
    id: "installmentThreeDate",
    accessorKey: "installmentThreeDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const date = row.original.installmentOneDate
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },
  {
    id: "invoiceStatus",
    accessorKey: "invoiceStatus",
    header: "Invoice Status",
    cell: ({ row }) => <Badge>{row.original?.invoiceStatus}</Badge>
  },
  {
    id: "sampleStatus",
    accessorKey: "sampleStatus",
    header: "Sample Status",
    cell: ({ row }) => <Badge>{row.original?.sampleStatus}</Badge>
  },
  { id: "sendSeries", accessorKey: "sendSeries", header: "Send Series" },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "created at",
    cell: ({ row }) => {
      const date = row.original.createdAt
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },

  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "updated at",
    cell: ({ row }) => {
      const date = row.original.updatedAt
      return date ? new Date(date).toLocaleDateString() : "-"
    }
  },

  {
    id: "registry registryCreatedBy",
    accessorKey: "registry registryCreatedBy",
    header: "registry Created By",
    cell: ({ row }) => {
      if (row.original.registryCreatedBy === undefined)
        console.log(row.original)

      return row.original?.registryCreatedBy ? (
        <Card className='w-56'>
          <CardContent>{row.original.registryCreatedBy.name}</CardContent>
        </Card>
      ) : (
        "-"
      )
    }
  },
  {
    id: "registryUpdatedBy",
    accessorKey: "registryUpdatedBy",
    header: "registry Updated By",
    cell: ({ row }) =>
      row.original?.updatedBy ? (
        <Card className='w-56'>
          <CardContent>{row.original.updatedBy.name}</CardContent>
        </Card>
      ) : (
        "-"
      )
  }
]
