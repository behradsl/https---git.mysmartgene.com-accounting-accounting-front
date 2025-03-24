"use client";

import { useEffect, useState } from "react";
import RegistryTableView from "./registry-table.view";

import {
  useRegistryFieldAccessFindByPosition,
  useRegistryFindMany,
} from "@/hooks/api";
import { RegistryDataTableRow } from "./registry-table-columns.data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/store/user.store";
import { RegistryEntityWithFieldAccess } from "@/types/registry-entity.type";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

interface RegistryViewProps {}

const RegistryView = ({}: RegistryViewProps) => {
  const currentUser = useUser((state) => state.user);
  const [tableData, setTableData] = useState<RegistryDataTableRow[]>([]);
  const { fieldAccesses: registryFieldAccesses } =
    useRegistryFieldAccessFindByPosition(currentUser?.position!);
  const {
    registries,
    mutate,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
  } = useRegistryFindMany();

  useEffect(() => {
    if (registries?.data) {
      const formattedData: RegistryDataTableRow[] =
        registries.data?.registries.map((registry: any) => ({
          id: registry.id?.value || "",
          sampleStatus: registry.sampleStatus?.value || "",
          MotId: registry.MotId?.value || "",
          personName: registry.personName?.value || "",
          invoiceStatus: registry.invoiceStatus?.value || "",
          kitType: registry.kitType?.value || "",
          laboratoryId: registry.laboratoryId?.value || "",
          productPriceUsd: registry.productPriceUsd?.value || "",
          sampleType: registry.sampleType?.value || "",
          sendSeries: registry.sendSeries?.value || "",
          serviceType: registry.serviceType?.value || "",
          analysisCompletionDate: registry.analysisCompletionDate?.value
            ? new Date(registry.analysisCompletionDate?.value).toISOString()
            : "",
          dataSampleReceived: registry.dataSampleReceived?.value
            ? new Date(registry.dataSampleReceived?.value).toISOString()
            : "",
          dataSentToKorea: registry.dataSentToKorea?.value
            ? new Date(registry.dataSentToKorea?.value).toISOString()
            : "",
          rawFileReceivedDate: registry.rawFileReceivedDate?.value
            ? new Date(registry.rawFileReceivedDate?.value).toISOString()
            : "",
          sampleExtractionDate: registry.sampleExtractionDate?.value
            ? new Date(registry.sampleExtractionDate?.value).toISOString()
            : "",
          resultReadyTime: registry.sampleExtractionDate?.value
            ? new Date(registry.sampleExtractionDate?.value).toISOString()
            : "",
          description: registry.description?.value || "",
          costumerRelationId: registry.costumerRelationId?.value || "",
          urgentStatus: registry.urgentStatus?.value || undefined,

          createdAt: registry.createdAt?.value
            ? new Date(registry.createdAt?.value).toISOString()
            : "",
          updatedAt: registry.updatedAt
            ? new Date(registry.updatedAt?.value).toISOString()
            : "",
          Laboratory: registry.laboratory || undefined,
          registryCreatedBy: registry.registryCreatedBy?.value || {},
          registryUpdatedBy: registry.registryUpdatedBy?.value || {},
        }));
      setTableData(formattedData);
    }
  }, [registries]);

  useEffect(() => {}, []);

  return (
    <main className='w-full py-4 px-2'>
      <header className='mb-8 flex items-center'>
        <SidebarTrigger className='mr-4' />
        <h1 className='text-2xl font-bold'>Registries (Finalized)</h1>
      </header>
      <RegistryTableView
        data={tableData}
        fieldAccesses={registryFieldAccesses?.data || []}
        reloadRegistriesList={mutate}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allItemsCount={registries?.data?.totalCount}
      />
    </main>
  );
};

export default RegistryView;
