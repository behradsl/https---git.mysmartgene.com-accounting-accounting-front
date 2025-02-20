import { Position } from "@/hooks/userHooks/types/user-type";

export interface RegistryType {
  id: string;
  MotId: string;
  name: string;

  Laboratory: string;

  serviceType: string;
  kitType: string;
  urgentStatus?: boolean;

  price: number;

  description?: string;

  costumerRelationInfo?: string;
  KoreaSendDate?: Date;

  resultReady?: boolean;
  resultReadyTime?: Date;

  settlementStatus: string;
  invoiceStatus: string;

  proformaSent?: boolean;
  proformaSentDate?: Date;

  totalInvoiceAmount: number;

  installmentOne?: number;
  installmentOneDate?: Date;

  installmentTwo?: number;
  installmentTwoDate?: Date;

  installmentThree?: number;
  installmentThreeDate?: Date;

  totalPaid: number;

  settlementDate?: Date;

  officialInvoiceSent?: boolean;
  officialInvoiceSentDate?: Date;

  sampleStatus: string;

  sendSeries: string;
}

export interface RegistryFieldAccessType {
  id: string;
  position: Position;
  registryField: string;
  access: AccessType;
}
export enum AccessType {
  "EDITABLE",
  "VISIBLE",
  "HIDDEN",
}
