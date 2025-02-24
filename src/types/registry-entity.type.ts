import type { UserPosition } from "./user-entity.type";

export interface RegistryEntity {
  id: string;
  MotId: string;
  name: string;

  laboratoryId: string;
  Laboratory?: { editable: boolean; value: { name: string } };

  serviceType: string;
  kitType: string;
  urgentStatus?: boolean;

  price: string;

  description?: string;

  costumerRelationInfo?: string;
  KoreaSendDate?: string;

  resultReady?: boolean;
  resultReadyTime?: string;

  settlementStatus: SettlementStatus;
  invoiceStatus: InvoiceStatus;

  proformaSent?: boolean;
  proformaSentDate?: string;

  totalInvoiceAmount: string;

  installmentOne?: string;
  installmentOneDate?: string;

  installmentTwo?: string;
  installmentTwoDate?: string;

  installmentThree?: string;
  installmentThreeDate?: string;

  totalPaid: string;

  settlementDate?: string;

  officialInvoiceSent?: boolean;
  officialInvoiceSentDate?: string;

  sampleStatus: SampleStatus;

  sendSeries: string;
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

export enum InvoiceStatus {
  "ISSUED" = "ISSUED",
  "NOT_ISSUED" = "NOT_ISSUED",
}

export enum SettlementStatus {
  "SETTLED" = "SETTLED",
  "PENDING" = "PENDING",
  "OVERDUE" = "OVERDUE",
}

export interface RegistryEntityWithFieldAccess {
  id: { editable: boolean; value: string };
  MotId: { editable: boolean; value: string };
  name: { editable: boolean; value: string };

  laboratoryId: { editable: boolean; value: string };
  Laboratory?: { editable: boolean; value: { name: string } };

  serviceType: { editable: boolean; value: string };
  kitType: { editable: boolean; value: string };
  urgentStatus?: { editable: boolean; value: boolean };

  price: { editable: boolean; value: string };

  description?: { editable: boolean; value: string };

  costumerRelationInfo?: { editable: boolean; value: string };
  KoreaSendDate?: { editable: boolean; value: string };

  resultReady?: { editable: boolean; value: boolean };
  resultReadyTime?: { editable: boolean; value: string };

  settlementStatus: { editable: boolean; value: SettlementStatus };
  invoiceStatus: { editable: boolean; value: SettlementStatus };

  proformaSent?: { editable: boolean; value: boolean };
  proformaSentDate?: { editable: boolean; value: string };

  totalInvoiceAmount: { editable: boolean; value: string };

  installmentOne?: { editable: boolean; value: string };
  installmentOneDate?: { editable: boolean; value: string };

  installmentTwo?: { editable: boolean; value: string };
  installmentTwoDate?: { editable: boolean; value: string };

  installmentThree?: { editable: boolean; value: string };
  installmentThreeDate?: { editable: boolean; value: string };

  totalPaid: { editable: boolean; value: string };

  settlementDate?: { editable: boolean; value: string };

  officialInvoiceSent?: { editable: boolean; value: boolean };
  officialInvoiceSentDate?: { editable: boolean; value: string };

  sampleStatus: { editable: boolean; value: SettlementStatus };

  sendSeries: { editable: boolean; value: string };
}

export interface RegistryFieldAccessType {
  id: string;
  position: UserPosition;
  registryField: string;
  access: AccessType;
}
export enum AccessType {
  "EDITABLE",
  "VISIBLE",
  "HIDDEN",
}
