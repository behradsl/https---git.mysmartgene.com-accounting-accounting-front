export interface UserEntity {
  id: string;
  name: string;
  position: UserPosition;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserPosition {
  "ADMIN" = "ADMIN",
  "FINANCE_MANAGER" = "FINANCE_MANAGER",

  "SALES_MANAGER" = "SALES_MANAGER",
  "SALES_REPRESENTATIVE" = "SALES_REPRESENTATIVE",
  "DATA_ENTRY" = "DATA_ENTRY",
}
