import { dataTableColumnGenerator } from "@/components/table/table-editable-column-generator";
import { RegistryEntity } from "@/types/registry-entity.type";

export type RegistrySettlementStatus = "SETTLED" | "PENDING" | "OVERDUE";
export type RegistryInvoiceStatus = "ISSUED" | "NOT_ISSUED";
export type RegistrySampleStatus =
  | "PENDING"
  | "SHIPMENT"
  | "SHIPPED"
  | "RECEIVED_AT_laboratory"
  | "IN_TESTING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED";

export type RegistryDataTableRow = {
  id: string;
  createdAt: string;
  updatedAt: string;

  registryCreatedBy?: {
    name: string;
    email: string;
    position: string;
    id: string;
  };

  registryUpdatedBy: {
    name: string;
    email: string;
    position: string;
    id: string;
  };
} & RegistryEntity;

export const registryColumnsStructure: Parameters<
  typeof dataTableColumnGenerator<RegistryDataTableRow>
>[0] = [
  { id: "MotId", title: "MOT ID", dataType: "text" },
  { id: "personName", title: "Persone Name", dataType: "text" },
  { id: "laboratoryId", title: "Laboratory", dataType: "select" },
  {
    id: "costumerRelationId",
    alternativeId: "costumerRelation",
    title: "costumer Relation By",
    dataType: "user",
    readonly: true,
  },
  { id: "serviceType", title: "Service Type", dataType: "text" },
  { id: "kitType", title: "Kit Type", dataType: "text" },
  { id: "sampleType", title: "Sample Type", dataType: "select" },
  { id: "urgentStatus", title: "Urgent Status", dataType: "switch" },
  { id: "description", title: "Description", dataType: "text" },
  { id: "productPriceUsd", title: "Product Price (USD)", dataType: "number" },

  { id: "dataSampleReceived", title: "Data Sample Received", dataType: "date" },
  {
    id: "sampleExtractionDate",
    title: "Sample Extraction Date",
    dataType: "date",
  },

  { id: "dataSentToKorea", title: "Data Sent To Korea", dataType: "date" },
  {
    id: "rawFileReceivedDate",
    title: "Raw File Received Date",
    dataType: "date",
  },

  {
    id: "analysisCompletionDate",
    title: "Analysis Completion Date",
    dataType: "date",
  },
  { id: "resultReadyTime", title: "Result Ready Time", dataType: "date" },

  { id: "sendSeries", title: "Send Series", dataType: "text" },

  {
    id: "userIdRegistryCreatedBy",
    alternativeId: "registryCreatedBy",
    title: "Registry Created By",
    dataType: "user",
    readonly: true,
  },
  {
    id: "userIdRegistryUpdatedBy",
    alternativeId: "registryUpdatedBy",
    title: "Registry Updated By",
    dataType: "user",
    readonly: true,
  },
  { id: "createdAt", title: "Created At", dataType: "date", readonly: true },
  { id: "updatedAt", title: "Updated At", dataType: "date", readonly: true },
];

export const registryColumns = (
  columnsStructure: typeof registryColumnsStructure,
) => {
  return dataTableColumnGenerator(columnsStructure);
};
