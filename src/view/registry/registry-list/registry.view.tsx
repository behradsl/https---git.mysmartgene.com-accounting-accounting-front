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
          id: registry.id?.value,
          MotId: registry.MotId?.value || "",
          name: registry.name?.value || "",
          Laboratory: registry.Laboratory?.value.name || "",
          laboratoryId: registry.laboratoryId?.value || "",
          serviceType: registry.serviceType?.value || "",
          kitType: registry.kitType?.value || "",

          urgentStatus: registry.urgentStatus?.value || false,
          price: registry.price?.value || "",
          description: registry.description?.value || "",
          costumerRelationInfo: registry.costumerRelationInfo?.value || "",
          KoreaSendDate: registry.KoreaSendDate?.value
            ? new Date(registry.KoreaSendDate?.value).toISOString()
            : "",
          resultReady: registry.resultReady?.value || false,
          resultReadyTime: registry.resultReadyTime?.value
            ? new Date(registry.resultReadyTime?.value).toISOString()
            : "",
          settlementStatus: registry.settlementStatus?.value || "",
          invoiceStatus: registry.invoiceStatus?.value || "",
          proformaSent: registry.proformaSent?.value || false,
          proformaSentDate: registry.proformaSentDate?.value
            ? new Date(registry.proformaSentDate?.value).toISOString()
            : "",
          totalInvoiceAmount: registry.totalInvoiceAmount?.value || "",
          installmentOne: registry.installmentOne?.value || "",
          installmentOneDate: registry.installmentOneDate?.value
            ? new Date(registry.installmentOneDate?.value).toISOString()
            : "",
          installmentTwo: registry.installmentTwo?.value || "",
          installmentTwoDate: registry.installmentTwoDate?.value
            ? new Date(registry.installmentTwoDate?.value).toISOString()
            : "",
          installmentThree: registry.installmentThree?.value || "",
          installmentThreeDate: registry.installmentThreeDate?.value
            ? new Date(registry.installmentThreeDate?.value).toISOString()
            : "",
          totalPaid: registry.totalPaid?.value || "",
          settlementDate: registry.settlementDate?.value
            ? new Date(registry.settlementDate?.value).toISOString()
            : "",
          officialInvoiceSent: registry.officialInvoiceSent?.value || false,
          officialInvoiceSentDate: registry.officialInvoiceSentDate?.value
            ? new Date(registry.officialInvoiceSentDate?.value).toISOString()
            : "",
          sampleStatus: registry.sampleStatus?.value || "",
          sendSeries: registry.sendSeries?.value || "",
          createdAt: registry.createdAt?.value
            ? new Date(registry.createdAt?.value).toISOString()
            : "",
          updatedAt: registry.createdAt?.value
            ? new Date(registry.createdAt?.value).toISOString()
            : "",

          registryCreatedBy: registry.registryCreatedBy?.value || "",
          updatedBy: registry.registryUpdatedBy?.value || "",
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
