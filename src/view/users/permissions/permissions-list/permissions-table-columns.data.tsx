import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import type { UserPosition } from "@/types/user-entity.type";
import clsx from "clsx";
import { AccessType } from "@/types/registry-entity.type";

export const registryFields = [
  "MotId",
  "name",
  "Laboratory",
  "serviceType",
  "kitType",
  "urgentStatus",
  "price",
  "description",
  "costumerRelationInfo",
  "KoreaSendDate",
  "resultReady",
  "resultReadyTime",
  "settlementStatus",
  "invoiceStatus",
  "proformaSent",
  "proformaSentDate",
  "totalInvoiceAmount",
  "installmentOne",
  "installmentOneDate",
  "installmentTwo",
  "installmentTwoDate",
  "installmentThree",
  "installmentThreeDate",
  "totalPaid",
  "settlementDate",
  "officialInvoiceSent",
  "officialInvoiceSentDate",
  "sampleStatus",
  "sendSeries",
  "createdAt",
  "updatedAt",
  "registryCreatedBy",
  "updatedBy",
];

export type PermissionsDataTableRow = {
  position: UserPosition;
  MotId: AccessType;
  name: AccessType;
  Laboratory: AccessType;
  serviceType: AccessType;
  kitType: AccessType;
  urgentStatus: AccessType;
  price: AccessType;
  description: AccessType;
  costumerRelationInfo: AccessType;
  KoreaSendDate: AccessType;
  resultReady: AccessType;
  resultReadyTime: AccessType;
  settlementStatus: AccessType;
  invoiceStatus: AccessType;
  proformaSent: AccessType;
  proformaSentDate: AccessType;
  totalInvoiceAmount: AccessType;
  installmentOne: AccessType;
  installmentOneDate: AccessType;
  installmentTwo: AccessType;
  installmentTwoDate: AccessType;
  installmentThree: AccessType;
  installmentThreeDate: AccessType;
  totalPaid: AccessType;
  settlementDate: AccessType;
  officialInvoiceSent: AccessType;
  officialInvoiceSentDate: AccessType;
  sampleStatus: AccessType;
  sendSeries: AccessType;
  createdAt: AccessType;
  updatedAt: AccessType;
  registryCreatedBy: AccessType;
  registryUpdatedBy: AccessType;
};

const getAccessBadgeColor = (access: AccessType) => {
  return clsx({
    "bg-green-600 text-white": access === AccessType.EDITABLE,
    "bg-blue-600 text-white": access === AccessType.VISIBLE,
    "bg-gray-400 text-black": access === AccessType.HIDDEN,
  });
};

export const PermissionsColumns: ColumnDef<PermissionsDataTableRow>[] = [
  {
    id: "position",
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="font-semibold">{row.original.position}</div>
    ),
  },

  {
    id: "MotId",
    accessorKey: "MotId",
    header: "MOT ID",
    cell: ({ row }) => {
      const access: AccessType = row.original.MotId ?? AccessType.HIDDEN;
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const access: AccessType = row.original.name ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "Laboratory",
    accessorKey: "Laboratory",
    header: "Laboratory",
    cell: ({ row }) => {
      const access: AccessType = row.original.Laboratory ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "serviceType",
    accessorKey: "serviceType",
    header: "Service Type",
    cell: ({ row }) => {
      const access: AccessType = row.original.serviceType ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      const access: AccessType = row.original.description ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "kitType",
    accessorKey: "kitType",
    header: "Kit Type",
    cell: ({ row }) => {
      const access: AccessType = row.original.kitType ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "urgentStatus",
    accessorKey: "urgentStatus",
    header: "Urgent",
    cell: ({ row }) => {
      const access: AccessType = row.original.urgentStatus ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => {
      const access: AccessType = row.original.price ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "costumerRelationInfo",
    accessorKey: "costumerRelationInfo",
    header: "Customer Info",
    cell: ({ row }) => {
      const access: AccessType = row.original.costumerRelationInfo ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "settlementStatus",
    accessorKey: "settlementStatus",
    header: "Settlement Status",
    cell: ({ row }) => {
      const access: AccessType = row.original.settlementStatus ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "KoreaSendDate",
    accessorKey: "KoreaSendDate",
    header: "Korea Send Date",
    cell: ({ row }) => {
      const access: AccessType = row.original.KoreaSendDate ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentOne",
    accessorKey: "installmentOne",
    header: "installmentOne ($)",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentOne ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentOneDate",
    accessorKey: "installmentOneDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentOneDate ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentTwo",
    accessorKey: "installmentTwo",
    header: "installmentTwo ($)",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentTwo ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentTwoDate",
    accessorKey: "installmentTwoDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentTwoDate ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentThree",
    accessorKey: "installmentThree",
    header: "installmentThree ($)",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentThree ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "installmentThreeDate",
    accessorKey: "installmentThreeDate",
    header: "Installment One Date",
    cell: ({ row }) => {
      const access: AccessType = row.original.installmentThreeDate ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "invoiceStatus",
    accessorKey: "invoiceStatus",
    header: "Invoice Status",
    cell: ({ row }) => {
      const access: AccessType = row.original.invoiceStatus ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "sampleStatus",
    accessorKey: "sampleStatus",
    header: "Sample Status",
    cell: ({ row }) => {
      const access: AccessType = row.original.sampleStatus ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "sendSeries",
    accessorKey: "sendSeries",
    header: "Send Series",
    cell: ({ row }) => {
      const access: AccessType = row.original.sendSeries ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "created at",
    cell: ({ row }) => {
      const access: AccessType = row.original.createdAt ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },

  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "updated at",
    cell: ({ row }) => {
      const access: AccessType = row.original.updatedAt ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },

  {
    id: "registry registryCreatedBy",
    accessorKey: "registry registryCreatedBy",
    header: "registry Created By",
    cell: ({ row }) => {
      const access: AccessType = row.original.registryCreatedBy ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
  {
    id: "registryUpdatedBy",
    accessorKey: "registryUpdatedBy",
    header: "registry Updated By",
    cell: ({ row }) => {
      const access: AccessType = row.original.registryUpdatedBy ?? "HIDDEN";
      return <Badge className={getAccessBadgeColor(access)}>{access}</Badge>;
    },
  },
];
