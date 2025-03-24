"use client";
import { useEffect, useState } from "react";
import { useRegistryFieldAccessFindMany, useUserFindMany } from "@/hooks/api";
import { PermissionsDataTableRow } from "./permissions-table-columns.data";
import PermissionsTableView from "./permissions-table.view";
import { AccessType } from "@/types/registry-entity.type";
import { UserPosition } from "@/types/user-entity.type";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
      UserPosition,
    ).map((position) => {
      console.log({ position, fieldAccesses: fieldAccesses?.data });

      if (fieldAccesses?.data.length) {
        const fieldAccessMap = fieldAccesses.data
          .filter((fa) => fa.position === position)
          .reduce((acc, field) => {
            acc[field.registryField as keyof PermissionsDataTableRow] =
              field.access ?? AccessType.HIDDEN;
            return acc;
          }, {} as Record<keyof PermissionsDataTableRow, AccessType>);

        return {
          position: position as any,
          MotId: fieldAccessMap.MotId || AccessType.HIDDEN,

          personName: fieldAccessMap.personName || AccessType.HIDDEN,
          laboratoryId: fieldAccessMap.laboratoryId || AccessType.HIDDEN,
          Laboratory: fieldAccessMap.Laboratory || AccessType.HIDDEN,
          costumerRelationId:
            fieldAccessMap.costumerRelationId || AccessType.HIDDEN,
          serviceType: fieldAccessMap.serviceType || AccessType.HIDDEN,
          kitType: fieldAccessMap.kitType || AccessType.HIDDEN,
          sampleType: fieldAccessMap.sampleType || AccessType.HIDDEN,
          urgentStatus: fieldAccessMap.urgentStatus || AccessType.HIDDEN,
          description: fieldAccessMap.description || AccessType.HIDDEN,
          productPriceUsd: fieldAccessMap.productPriceUsd || AccessType.HIDDEN,
          dataSampleReceived:
            fieldAccessMap.dataSampleReceived || AccessType.HIDDEN,
          sampleExtractionDate:
            fieldAccessMap.sampleExtractionDate || AccessType.HIDDEN,
          dataSentToKorea: fieldAccessMap.dataSentToKorea || AccessType.HIDDEN,
          rawFileReceivedDate:
            fieldAccessMap.rawFileReceivedDate || AccessType.HIDDEN,
          analysisCompletionDate:
            fieldAccessMap.analysisCompletionDate || AccessType.HIDDEN,
          resultReadyTime: fieldAccessMap.resultReadyTime || AccessType.HIDDEN,
          sendSeries: fieldAccessMap.sendSeries || AccessType.HIDDEN,
          sampleStatus: fieldAccessMap.sampleStatus || AccessType.HIDDEN,

          createdAt: fieldAccessMap.createdAt || AccessType.HIDDEN,
          updatedAt: fieldAccessMap.updatedAt || AccessType.HIDDEN,
          updatedBy: fieldAccessMap.updatedBy || AccessType.HIDDEN,
          registryCreatedBy:
            fieldAccessMap.registryCreatedBy || AccessType.HIDDEN,
          registryUpdatedBy:
            fieldAccessMap.registryUpdatedBy || AccessType.HIDDEN,
        };
      } else {
        return {
          position,
          MotId: AccessType.HIDDEN,
          personName: AccessType.HIDDEN,
          laboratoryId: AccessType.HIDDEN,
          Laboratory: AccessType.HIDDEN,
          costumerRelationId: AccessType.HIDDEN,
          serviceType: AccessType.HIDDEN,
          kitType: AccessType.HIDDEN,
          sampleType: AccessType.HIDDEN,
          urgentStatus: AccessType.HIDDEN,
          description: AccessType.HIDDEN,
          productPriceUsd: AccessType.HIDDEN,
          dataSampleReceived: AccessType.HIDDEN,
          sampleExtractionDate: AccessType.HIDDEN,
          dataSentToKorea: AccessType.HIDDEN,
          rawFileReceivedDate: AccessType.HIDDEN,
          analysisCompletionDate: AccessType.HIDDEN,
          resultReadyTime: AccessType.HIDDEN,
          sendSeries: AccessType.HIDDEN,
          sampleStatus: AccessType.HIDDEN,

          createdAt: AccessType.HIDDEN,
          updatedAt: AccessType.HIDDEN,
          updatedBy: AccessType.HIDDEN,
          registryCreatedBy: AccessType.HIDDEN,
          registryUpdatedBy: AccessType.HIDDEN,
        };
      }
    });

    setTableData(formattedData);
  }, [fieldAccesses?.data.length, positions]);
  return (
    <main className='w-full py-4 px-2'>
      <header className='mb-8 flex items-center'>
        <SidebarTrigger className='mr-4' />
        <h1 className='text-2xl font-bold'>User Access Permissions</h1>
      </header>
      <PermissionsTableView data={tableData} />
    </main>
  );
};

export default PermissionsView;
