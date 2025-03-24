export interface LaboratoryEntity {
  id: string;
  name: string;
  type: LaboratoriesType;
  code: string | null;
  address: string | null;
  contactName: string | null;
  phoneNumber: string | null;
  email: string | null;
  paymentType: PaymentType;
  fax: string | null;

  accountManagerId: string;
}

export interface LaboratoryFormalPaymentInfoType {
  name:string;
  LaboratoryFormalPaymentInfo?: {
    id:string;
    laboratoryId: string;
    legalEntityName: string;
    economicNumber: string;
    nationalId: string;
    fullAddress: string;
    province: string;
    city: string;
    registrationNumber: string;
    postalCode: string;
  };
}

export enum LaboratoriesType {
  "LABORATORY" = "LABORATORY",
  "RESEARCH_CENTER" = "RESEARCH_CENTER",
  "INDIVIDUAL" = "INDIVIDUAL",
}

export enum PaymentType {
  "FORMAL" = "FORMAL",
  "INFORMAL" = "INFORMAL",
}
