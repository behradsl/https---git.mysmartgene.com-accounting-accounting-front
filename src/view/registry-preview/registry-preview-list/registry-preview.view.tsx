"use client";

import { useEffect, useState } from "react";
import {
  useRegistryFieldAccessFindByPosition,
  useRegistryPreviewFindMany,
} from "@/hooks/api";

import RegistryPreviewTableView from "./registry-preview-table.view";
import RegistryCreateDialogView from "@/view/registry/registry-create/registry-create-dialog.view";
import { RegistryDataTableRow } from "@/view/registry/registry-list/registry-table-columns.data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/store/user.store";

interface RegistryViewProps {}

const RegistryPreviewView = ({}: RegistryViewProps) => {
  const currentUser = useUser((state) => state.user);
  const [tableData, setTableData] = useState<RegistryDataTableRow[]>([]);
  const { fieldAccesses } = useRegistryFieldAccessFindByPosition(
    currentUser?.position!,
  );
  const {
    registries,
    mutate,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    setSortBy,
    sortBy,
  } = useRegistryPreviewFindMany();

  useEffect(() => {
    if (registries?.data) {
      const formattedData: RegistryDataTableRow[] =
        registries.data?.registries.map((registry: any) => ({
          id: registry.id,
          MotId: registry.MotId || "",
          personName: registry.personName || "",
          kitType: registry.kitType || "",
          laboratoryId: registry.laboratoryId || "",
          productPriceUsd: registry.productPriceUsd || "",
          sampleType: registry.sampleType || "",
          sendSeries: registry.sendSeries || "",
          serviceType: registry.serviceType || "",
          analysisCompletionDate: registry.analysisCompletionDate
            ? new Date(registry.analysisCompletionDate).toISOString()
            : "",
          dataSampleReceived: registry.dataSampleReceived
            ? new Date(registry.dataSampleReceived).toISOString()
            : "",
          dataSentToKorea: registry.dataSentToKorea
            ? new Date(registry.dataSentToKorea).toISOString()
            : "",
          rawFileReceivedDate: registry.rawFileReceivedDate
            ? new Date(registry.rawFileReceivedDate).toISOString()
            : "",
          sampleExtractionDate: registry.sampleExtractionDate
            ? new Date(registry.sampleExtractionDate).toISOString()
            : "",
          resultReadyTime: registry.resultReadyTime
            ? new Date(registry.resultReadyTime).toISOString()
            : "",
          description: registry.description || "",
          sampleStatus: registry.sampleStatus || "",
          costumerRelationId: registry.costumerRelationId || "",
          urgentStatus: registry.urgentStatus || undefined,

          createdAt: registry.createdAt
            ? new Date(registry.createdAt).toISOString()
            : "",
          updatedAt: registry.createdAt
            ? new Date(registry.createdAt).toISOString()
            : "",
          Laboratory: registry.laboratory || undefined,
          registryCreatedBy: registry.registryCreatedBy || "",
          registryUpdatedBy: registry.registryUpdatedBy || "",
        }));

      setTableData(formattedData);
    }
  }, [registries]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>Registries (Staged)</h1>
        </header>
        <div>
          <RegistryCreateDialogView onClose={mutate} />
        </div>
      </div>
      <RegistryPreviewTableView
        data={tableData}
        fieldAccesses={fieldAccesses?.data || []}
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

export default RegistryPreviewView;
