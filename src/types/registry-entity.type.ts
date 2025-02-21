import type { UserPosition } from "./user-entity.type"

export interface RegistryEntity {
  id: string
  MotId: string
  name: string

  Laboratory: string

  serviceType: string
  kitType: string
  urgentStatus?: boolean

  price: number

  description?: string

  costumerRelationInfo?: string
  KoreaSendDate?: Date

  resultReady?: boolean
  resultReadyTime?: Date

  settlementStatus: string
  invoiceStatus: string

  proformaSent?: boolean
  proformaSentDate?: Date

  totalInvoiceAmount: number

  installmentOne?: number
  installmentOneDate?: Date

  installmentTwo?: number
  installmentTwoDate?: Date

  installmentThree?: number
  installmentThreeDate?: Date

  totalPaid: number

  settlementDate?: Date

  officialInvoiceSent?: boolean
  officialInvoiceSentDate?: Date

  sampleStatus: string

  sendSeries: string
}
export interface RegistryEntityWithFieldAccess {
  id: { editable: boolean; value: string }
  MotId: { editable: boolean; value: string }
  name: { editable: boolean; value: string }

  Laboratory: { editable: boolean; value: string }

  serviceType: { editable: boolean; value: string }
  kitType: { editable: boolean; value: string }
  urgentStatus?: { editable: boolean; value: boolean }

  price: { editable: boolean; value: number }

  description?: { editable: boolean; value: string }

  costumerRelationInfo?: { editable: boolean; value: string }
  KoreaSendDate?: { editable: boolean; value: string }

  resultReady?: { editable: boolean; value: boolean }
  resultReadyTime?: { editable: boolean; value: string }

  settlementStatus: { editable: boolean; value: string }
  invoiceStatus: { editable: boolean; value: string }

  proformaSent?: { editable: boolean; value: boolean }
  proformaSentDate?: { editable: boolean; value: string }

  totalInvoiceAmount: { editable: boolean; value: number }

  installmentOne?: { editable: boolean; value: number }
  installmentOneDate?: { editable: boolean; value: string }

  installmentTwo?: { editable: boolean; value: number }
  installmentTwoDate?: { editable: boolean; value: string }

  installmentThree?: { editable: boolean; value: number }
  installmentThreeDate?: { editable: boolean; value: string }

  totalPaid: { editable: boolean; value: number }

  settlementDate?: { editable: boolean; value: string }

  officialInvoiceSent?: boolean
  officialInvoiceSentDate?: { editable: boolean; value: string }

  sampleStatus: { editable: boolean; value: string }

  sendSeries: { editable: boolean; value: string }
}

export interface RegistryFieldAccessType {
  id: string
  position: UserPosition
  registryField: string
  access: AccessType
}
export enum AccessType {
  "EDITABLE",
  "VISIBLE",
  "HIDDEN"
}
