import type { UserPosition } from "@/types/user-entity.type";
import clsx from "clsx";
import { AccessType } from "@/types/registry-entity.type";
import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";

export const registryFields = [
  "MotId",
  "personName",
  "laboratoryId",
  "Laboratory",
  "costumerRelationId",
  "serviceType",
  "kitType",
  "sampleType",
  "urgentStatus",
  "description",
  "productPriceUsd",

  "dataSampleReceived",
  "sampleExtractionDate",
  "dataSentToKorea",
  "rawFileReceivedDate",
  "analysisCompletionDate",
  "resultReadyTime",
  "sendSeries",
  "createdAt",
  "updatedAt",
  "updatedBy",
];

export type PermissionsDataTableRow = Record<
  Exclude<(typeof registryFields)[number], "position">,
  AccessType
> & {
  position?: UserPosition;
};

export const permissionsColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<PermissionsDataTableRow>
>[0] = [
  {
    id: "position",
    title: "User Role",

    dataType: "text",
    readonly: true,
  },
  {
    id: "MotId",
    title: "MOT ID",

    dataType: "text",
    readonly: true,
  },
  {
    id: "sampleStatus",
    title: "Sample Status",

    dataType: "text",
    readonly: true,
  },
  {
    id: "personName",
    title: "person Name",

    dataType: "text",
    readonly: true,
  },
  {
    id: "laboratoryId",
    title: "Laboratory",
    // alternativeId: "accessType",
    dataType: "text",
    readonly: true,
  },
  {
    id: "costumerRelationId",
    alternativeId: "costumerRelationId",
    title: "costumer Relation By",

    dataType: "text",
    readonly: true,
  },
  {
    id: "kitType",
    title: "Kit Type",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "Laboratory",
    title: "Laboratory",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "urgentStatus",
    title: "Urgent Status",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "invoiceStatus",
    title: "Invoice Status",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "description",
    title: "Description",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "productPriceUsd",
    title: "Product Price (USD)",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },

  {
    id: "dataSampleReceived",
    title: "Data Sample Received",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "sampleExtractionDate",
    title: "Sample Extraction Date",

    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },

  {
    id: "dataSentToKorea",
    title: "Data Sent To Korea",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "rawFileReceivedDate",
    title: "Raw File Received Date",

    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },

  {
    id: "analysisCompletionDate",
    title: "Analysis Completion Date",

    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "resultReadyTime",
    title: "Result Ready Time",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },

  {
    id: "sendSeries",
    title: "Send Series",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },

  {
    id: "userIdRegistryCreatedBy",
    alternativeId: "registryCreatedBy",
    title: "Registry Created By",

    dataType: "text",
    readonly: true,
  },
  {
    id: "userIdRegistryUpdatedBy",
    alternativeId: "registryUpdatedBy",
    title: "Registry Updated By",

    dataType: "text",
    readonly: true,
  },
  {
    id: "createdAt",
    title: "Created At",
    // alternativeId: "accessType",

    dataType: "text",
    readonly: true,
  },
  {
    id: "updatedAt",
    title: "Updated At",

    dataType: "text",
    readonly: true,
  },
];

export const permissionsColumns = (
  columnsStructure: typeof permissionsColumnsStructure,
) => {
  return dataTableColumnGenerator(columnsStructure);
};

const getAccessBadgeColor = (access: AccessType) => {
  return clsx({
    "bg-green-600 text-white": access === AccessType.EDITABLE,
    "bg-blue-600 text-white": access === AccessType.VISIBLE,
    "bg-gray-400 text-black": access === AccessType.HIDDEN,
  });
};
