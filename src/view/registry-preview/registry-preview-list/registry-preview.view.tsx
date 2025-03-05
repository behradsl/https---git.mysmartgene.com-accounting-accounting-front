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
          name: registry.name || "",
          laboratoryId: registry.laboratoryId || "",
          Laboratory: registry.Laboratory.name || "",
          serviceType: registry.serviceType || "",
          kitType: registry.kitType || "",

          urgentStatus: registry.urgentStatus || false,
          price: registry.price || 0,
          description: registry.description || "",
          costumerRelationInfo: registry.costumerRelationInfo || "",
          KoreaSendDate: registry.KoreaSendDate
            ? new Date(registry.KoreaSendDate).toISOString()
            : "",
          resultReady: registry.resultReady || false,
          resultReadyTime: registry.resultReadyTime
            ? new Date(registry.resultReadyTime).toISOString()
            : "",
          settlementStatus: registry.settlementStatus || "",
          invoiceStatus: registry.invoiceStatus || "",
          proformaSent: registry.proformaSent || false,
          proformaSentDate: registry.proformaSentDate
            ? new Date(registry.proformaSentDate).toISOString()
            : "",
          totalInvoiceAmount: registry.totalInvoiceAmount || 0,
          installmentOne: registry.installmentOne || 0,
          installmentOneDate: registry.installmentOneDate
            ? new Date(registry.installmentOneDate).toISOString()
            : "",
          installmentTwo: registry.installmentTwo || 0,
          installmentTwoDate: registry.installmentTwoDate
            ? new Date(registry.installmentTwoDate).toISOString()
            : "",
          installmentThree: registry.installmentThree || 0,
          installmentThreeDate: registry.installmentThreeDate
            ? new Date(registry.installmentThreeDate).toISOString()
            : "",
          totalPaid: registry.totalPaid || 0,
          settlementDate: registry.settlementDate
            ? new Date(registry.settlementDate).toISOString()
            : "",
          officialInvoiceSent: registry.officialInvoiceSent || false,
          officialInvoiceSentDate: registry.officialInvoiceSentDate
            ? new Date(registry.officialInvoiceSentDate).toISOString()
            : "",
          sampleStatus: registry.sampleStatus || "",
          sendSeries: registry.sendSeries || "",
          createdAt: registry.createdAt
            ? new Date(registry.createdAt).toISOString()
            : "",
          updatedAt: registry.createdAt
            ? new Date(registry.createdAt).toISOString()
            : "",

          registryCreatedBy: registry.registryCreatedBy || "",
          updatedBy: registry.registryUpdatedBy || "",
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
