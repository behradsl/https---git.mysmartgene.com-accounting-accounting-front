"use client";

import { useEffect, useState } from "react";
import { useRegistryPreviewFindMany } from "@/hooks/api";
import { DataTableRow } from "../../registry/registry-list/registry-table-columns.data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegistryPreviewTableView from "./registry-preview-table.view";
import { PreviewDataTableRow } from "./registry-preview-table-columns.data";

interface RegistryViewProps {}

const RegistryPreviewView = ({}: RegistryViewProps) => {
  const [tableData, setTableData] = useState<PreviewDataTableRow[]>([]);
  const { registries, mutate } = useRegistryPreviewFindMany();

  useEffect(() => {
    if (registries?.data) {
      const formattedData: PreviewDataTableRow[] = registries.data?.map(
        (registry: any) => ({
          id: registry.id,
          MotId: registry.MotId || "",
          name: registry.name || "",
          laboratoryId: registry.laboratoryId || "",
          Laboratory:registry.Laboratory.name || "",
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
        })
      );

      setTableData(formattedData);
    }
  }, [registries]);

  useEffect(() => {}, []);

  return (
    <main className="w-full py-4 px-2">
      <div className="flex items-center justify-between gap-3 w-full">
        <h2 className="font-semibold text-xl">Registry List</h2>
        <div>
          <Button asChild variant={"default"}>
            <Link href={`/panel/registries/create`}>Create Registry</Link>
          </Button>
        </div>
      </div>
      <RegistryPreviewTableView
        data={tableData}
        reloadRegistriesList={mutate}
      />
    </main>
  );
};

export default RegistryPreviewView;
