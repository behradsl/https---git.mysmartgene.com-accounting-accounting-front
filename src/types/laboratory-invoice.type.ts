export enum InvoiceCurrencyType {
  "USD" = "DOLLAR",
  "EUR" = "EURO",
  "IRR" = "RIAL",
  "IRT" = "TOMAN",
}
export enum LaboratoryInvoiceStatusType {
  DRAFT = "DRAFT",
  ISSUED = "ISSUED",
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export enum LaboratoryInvoicePaymentStatusType {
  DRAFT = "DRAFT",
  ISSUED = "ISSUED",
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}
export interface LaboratoryInvoiceEntity {
  id: string;
  invoiceNumber: number;
  invoiceDate: string;
  LaboratoryId: string;
  LaboratoryInvoiceId: string;
  status: LaboratoryInvoiceStatusType;
  paymentDueDate: string;
  paymentStatus: LaboratoryInvoiceStatusType;
  notes: string;
  totalUsdPrice: string;
  usdExchangeRate: string;
  totalPriceRial: string;
  outstandingAmount: string;
  createdAt: string;
  updatedAt: string | null;
  createdById: string;
  updatedById: string | null;
  createdBy: {
    name: string;
    id: string;
    email: string;
    position: string;
  };
  updatedBy?: string;
  Laboratory: {
    name: string;
  };
}

export interface LaboratoryInvoiceCreateEntity {
  registryIds: string[];
  usdExchangeRate: string;
  notes?: string;
  currency?: InvoiceCurrencyType;
  invoiceDate?: string;
  paymentDueDate?: string;
}

export interface LaboratoryInvoicePaymentCreateEntity {
  id?: string;
  LaboratoryInvoiceId: string;
  amountPaid: string;
  paymentDate: string;
  currency: InvoiceCurrencyType;
  usdExchangeRate: number;
  notes?: string;
}

export interface LaboratoryInvoicePaymentEntity {
  id: string;
  LaboratoryId: string;
  LaboratoryInvoiceId: string;
  amountPaid: string;
  paymentDate: string;
  currency: InvoiceCurrencyType;
  notes: string;
  createdAt: string;
  updatedAt: string | null;
  createdById: string;
  updatedById: string | null;
  createdBy: {
    name: string;
    id: string;
    email: string;
    position: string;
  };
  updatedBy: string | null;
  Laboratory: {
    name: string;
  };
}
