export interface LaboratoryEntity {
  id: string
  name: string
  type: string
  code: string
  address: string
  contactName: string
  phoneNumber: string
  email: string
  paymentType: string
  fax: string

  accountManagerId: string

  UserIdCreatedBy: string
}

export interface LaboratoryFormalPaymentInfoType {
  id: string
  laboratoryId: string
  legalEntityName: string
  economicNumber: string
  nationalId: string
  fullAddress: string
  province: string
  city: string
  registrationNumber: string
  postalCode: string
}
