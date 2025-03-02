"use client";
import { useEffect, useState } from "react";
import { useRegistryFieldAccessFindMany, useUserFindMany } from "@/hooks/api";
import { PermissionsDataTableRow } from "./permissions-table-columns.data";
import PermissionsTableView from "./permissions-table.view";
import { AccessType } from "@/types/registry-entity.type";
import { UserPosition } from "@/types/user-entity.type";

interface UsersViewProps {}

export const positions = [
  "ADMIN",
  "FINANCE_MANAGER",
  "SALES_MANAGER",
  "SALES_REPRESENTATIVE",
  "DATA_ENTRY",
];

const PermissionsView = ({}: UsersViewProps) => {
  const [tableData, setTableData] = useState<PermissionsDataTableRow[]>([]);
  const { fieldAccesses } = useRegistryFieldAccessFindMany();

  useEffect(() => {
    const formattedData: PermissionsDataTableRow[] = Object.values(
      UserPosition
    ).map((position) => {
      if (fieldAccesses?.data.length) {
        const fieldAccessMap = fieldAccesses.data
          .filter((fa) => fa.position === position)
          .reduce((acc, field) => {
            acc[field.registryField as keyof PermissionsDataTableRow] =
              field.access ?? AccessType.HIDDEN;
            return acc;
          }, {} as Record<keyof PermissionsDataTableRow, AccessType>);

        return {
          position,
          MotId: fieldAccessMap.MotId || AccessType.HIDDEN,
          name: fieldAccessMap.name || AccessType.HIDDEN,
          Laboratory: fieldAccessMap.Laboratory || AccessType.HIDDEN,
          serviceType: fieldAccessMap.serviceType || AccessType.HIDDEN,
          kitType: fieldAccessMap.kitType || AccessType.HIDDEN,
          urgentStatus: fieldAccessMap.urgentStatus || AccessType.HIDDEN,
          price: fieldAccessMap.price || AccessType.HIDDEN,
          description: fieldAccessMap.description || AccessType.HIDDEN,
          costumerRelationInfo:
            fieldAccessMap.costumerRelationInfo || AccessType.HIDDEN,
          KoreaSendDate: fieldAccessMap.KoreaSendDate || AccessType.HIDDEN,
          resultReady: fieldAccessMap.resultReady || AccessType.HIDDEN,
          resultReadyTime: fieldAccessMap.resultReadyTime || AccessType.HIDDEN,
          settlementStatus:
            fieldAccessMap.settlementStatus || AccessType.HIDDEN,
          invoiceStatus: fieldAccessMap.invoiceStatus || AccessType.HIDDEN,
          proformaSent: fieldAccessMap.proformaSent || AccessType.HIDDEN,
          proformaSentDate:
            fieldAccessMap.proformaSentDate || AccessType.HIDDEN,
          totalInvoiceAmount:
            fieldAccessMap.totalInvoiceAmount || AccessType.HIDDEN,
          installmentOne: fieldAccessMap.installmentOne || AccessType.HIDDEN,
          installmentOneDate:
            fieldAccessMap.installmentOneDate || AccessType.HIDDEN,
          installmentTwo: fieldAccessMap.installmentTwo || AccessType.HIDDEN,
          installmentTwoDate:
            fieldAccessMap.installmentTwoDate || AccessType.HIDDEN,
          installmentThree:
            fieldAccessMap.installmentThree || AccessType.HIDDEN,
          installmentThreeDate:
            fieldAccessMap.installmentThreeDate || AccessType.HIDDEN,
          totalPaid: fieldAccessMap.totalPaid || AccessType.HIDDEN,
          settlementDate: fieldAccessMap.settlementDate || AccessType.HIDDEN,
          officialInvoiceSent:
            fieldAccessMap.officialInvoiceSent || AccessType.HIDDEN,
          officialInvoiceSentDate:
            fieldAccessMap.officialInvoiceSentDate || AccessType.HIDDEN,
          sampleStatus: fieldAccessMap.sampleStatus || AccessType.HIDDEN,
          sendSeries: fieldAccessMap.sendSeries || AccessType.HIDDEN,
          createdAt: fieldAccessMap.createdAt || AccessType.HIDDEN,
          updatedAt: fieldAccessMap.updatedAt || AccessType.HIDDEN,
          registryCreatedBy:
            fieldAccessMap.registryCreatedBy || AccessType.HIDDEN,
          registryUpdatedBy:
            fieldAccessMap.registryUpdatedBy || AccessType.HIDDEN,
        };
      } else {
        return {
          position,
          MotId: AccessType.HIDDEN,
          name: AccessType.HIDDEN,
          Laboratory: AccessType.HIDDEN,
          serviceType: AccessType.HIDDEN,
          kitType: AccessType.HIDDEN,
          urgentStatus: AccessType.HIDDEN,
          price: AccessType.HIDDEN,
          description: AccessType.HIDDEN,
          costumerRelationInfo: AccessType.HIDDEN,
          KoreaSendDate: AccessType.HIDDEN,
          resultReady: AccessType.HIDDEN,
          resultReadyTime: AccessType.HIDDEN,
          settlementStatus: AccessType.HIDDEN,
          invoiceStatus: AccessType.HIDDEN,
          proformaSent: AccessType.HIDDEN,
          proformaSentDate: AccessType.HIDDEN,
          totalInvoiceAmount: AccessType.HIDDEN,
          installmentOne: AccessType.HIDDEN,
          installmentOneDate: AccessType.HIDDEN,
          installmentTwo: AccessType.HIDDEN,
          installmentTwoDate: AccessType.HIDDEN,
          installmentThree: AccessType.HIDDEN,
          installmentThreeDate: AccessType.HIDDEN,
          totalPaid: AccessType.HIDDEN,
          settlementDate: AccessType.HIDDEN,
          officialInvoiceSent: AccessType.HIDDEN,
          officialInvoiceSentDate: AccessType.HIDDEN,
          sampleStatus: AccessType.HIDDEN,
          sendSeries: AccessType.HIDDEN,
          createdAt: AccessType.HIDDEN,
          updatedAt: AccessType.HIDDEN,
          registryCreatedBy: AccessType.HIDDEN,
          registryUpdatedBy: AccessType.HIDDEN,
        };
      }
    });

    setTableData(formattedData);
  }, [fieldAccesses?.data.length, positions]);
  return (
    <main className="w-full py-4 px-2">
      <div className="flex items-center justify-between gap-3 w-full">
        <h2 className="font-semibold text-xl">permissions List</h2>
      </div>
      <PermissionsTableView data={tableData} />
    </main>
  );
};

export default PermissionsView;
