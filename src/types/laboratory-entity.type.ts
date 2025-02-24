export interface LaboratoryEntity {
  id: string;
  name: string;
  type: string | null;
  code: string | null;
  address: string | null;
  contactName: string | null;
  phoneNumber: string | null;
  email: string | null;
  paymentType: string | null;
  fax: string | null;

  accountManagerId: string | null;

  UserIdCreatedBy: string | null;
}

export interface LaboratoryFormalPaymentInfoType {
  id: string;
  laboratoryId: string;
  legalEntityName: string;
  economicNumber: string;
  nationalId: string;
  fullAddress: string;
  province: string;
  city: string;
  registrationNumber: string;
  postalCode: string;
}
