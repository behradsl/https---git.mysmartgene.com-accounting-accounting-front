import type { UserPosition } from "./user-entity.type";

export interface RegistryEntity {
  id?: string;
  ids?: string[];
  MotId: string;
  personName: string;
  laboratoryId: string;
  Laboratory?: { editable: boolean; value: { name: string } };
  costumerRelationId: string;
  serviceType: string;
  kitType: string;
  sampleType: SampleType;
  urgentStatus?: boolean;
  description?: string;
  productPriceUsd: number;

  dataSampleReceived?: string;
  sampleExtractionDate?: string;
  dataSentToKorea?: string;
  rawFileReceivedDate?: string;
  analysisCompletionDate?: string;
  resultReadyTime?: string;
  sendSeries: number;
}

export enum SampleStatus {
  "PENDING" = "PENDING",
  "SHIPMENT" = "SHIPMENT",
  "SHIPPED" = "SHIPPED",
  "RECEIVED_AT_LIBRARY" = "RECEIVED_AT_LIBRARY",
  "IN_TESTING" = "IN_TESTING",
  "READY_FOR_DELIVERY" = "READY_FOR_DELIVERY",
  "DELIVERED" = "DELIVERED",
}

export enum SampleType {
  BLOOD_DNA = "BLOOD_DNA",
  TISSUE = "TISSUE",
  EMBRYO = "EMBRYO",
}

export enum SettlementStatus {
  "SETTLED" = "SETTLED",
  "PENDING" = "PENDING",
  "OVERDUE" = "OVERDUE",
}

export interface RegistryEntityWithFieldAccess {
  id: { editable: boolean; value: string };
  MotId: { editable: boolean; value: string };
  personName: { editable: boolean; value: string };
  laboratoryId: { editable: boolean; value: string };
  costumerRelationId: { editable: boolean; value: string };
  costumerRelationInfo: { editable: boolean; value: any };
  serviceType: { editable: boolean; value: string };
  kitType: { editable: boolean; value: string };
  sampleType: { editable: boolean; value: string };
  urgentStatus: { editable: boolean; value: string };
  description: { editable: boolean; value: string };
  productPriceUsd: { editable: boolean; value: string };
  dataSampleReceived: { editable: boolean; value: string };
  sampleExtractionDate: { editable: boolean; value: string };
  dataSentToKorea: { editable: boolean; value: string };
  rawFileReceivedDate: { editable: boolean; value: string };
  analysisCompletionDate: { editable: boolean; value: string };
  resultReadyTime: { editable: boolean; value: string };
  sendSeries: { editable: boolean; value: string };
  Laboratory?: { editable: boolean; value: { name: string } };
  createdAt?: { editable: boolean; value: string };
  updatedAt?: { editable: boolean; value: string };
  registryCreatedBy?: {
    editable: boolean;
    value?: {
      name: string;
      email: string;
      position: string;
      id: string;
    };
  };
  registryUpdatedBy?: {
    editable: boolean;
    value?: {
      name: string;
      email: string;
      position: string;
      id: string;
    };
  };
}

export interface RegistryFieldAccessType {
  id: string;
  position: UserPosition;
  registryField: string;
  access: AccessType;
}
export enum AccessType {
  "EDITABLE" = "EDITABLE",
  "VISIBLE" = "VISIBLE",
  "HIDDEN" = "HIDDEN",
}
