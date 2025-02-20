export interface userType {
  id: string;
  name: string;
  position: Position;
  phoneNumber: string;
  email: string;
  createdAt:string;
  updatedAt:string;
}

export enum Position {
  "ADMIN",
  "FINANCE_MANAGER",

  "SALES_MANAGER",
  "SALES_REPRESENTATIVE",
  "DATA_ENTRY",
}
