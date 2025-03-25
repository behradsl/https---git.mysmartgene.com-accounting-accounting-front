import { LaboratoryInvoiceStatusType } from "./laboratory-invoice.type";
import type { UserPosition } from "./user-entity.type";

export enum RegistryServiceType {
  WES100 = "WES100",
  WES200 = "WES200",
  WES300 = "WES300",
  BRCA_1_2 = "BRCA_1_2",
  CANCER_PANEL_16_GENES = "CANCER_PANEL_16_GENES",
  CANCER_PANEL_69_GENES = "CANCER_PANEL_69_GENES",
  CANCER_PANEL_88_GENES = "CANCER_PANEL_88_GENES",
  CANCER_PANEL_171_GENES = "CANCER_PANEL_171_GENES",
  CANCER_PANEL_554_GENES = "CANCER_PANEL_554_GENES",
  S16S_RNA = "S16S_RNA",
  RNA_SEQ_6G = "RNA_SEQ_6G",
  RNA_SEQ_12G = "RNA_SEQ_12G",
  RNA_SEQ_9G = "RNA_SEQ_9G",
  WHOLE_GENOME_30X = "WHOLE_GENOME_30X",
  WHOLE_GENOME_10X = "WHOLE_GENOME_10X",
  WHOLE_GENOME_1X = "WHOLE_GENOME_1X",
}

export enum RegistryKitType {
  AGILENT_SURESELECT_V7 = "AGILENT_SURESELECT_V7",
  AGILENT_SURESELECT_V8 = "AGILENT_SURESELECT_V8",
  TWIST2 = "TWIST2",
}

export interface RegistryEntity {
  id?: string;
  ids?: string[];
  MotId: string;
  personName: string;
  laboratoryId: string;
  Laboratory?: { editable: boolean; value: { name: string } };
  costumerRelationId?: string;
  serviceType: RegistryServiceType;
  kitType: RegistryKitType;
  sampleType: SampleType;
  urgentStatus?: boolean;
  description?: string;
  productPriceUsd?: string;
  sampleStatus?: SampleStatus;

  dataSampleReceived: string;
  sampleExtractionDate?: string;
  dataSentToKorea?: string;
  rawFileReceivedDate?: string;
  analysisCompletionDate?: string;
  resultReadyTime?: string;
  sendSeries: number;
  invoiceStatus?: LaboratoryInvoiceStatusType;
}

export enum SampleStatus {
  SAMPLE_RECEIVED = "SAMPLE_RECEIVED",
  DNA_EXTRACTED = "DNA_EXTRACTED",
  SENT_TO_KOREA = "SENT_TO_KOREA",
  RAW_FILE_RECEIVED = "RAW_FILE_RECEIVED",
  ANALYZED = "ANALYZED",
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
  invoiceStatus: { editable: boolean; value: LaboratoryInvoiceStatusType };
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
