"use client";
import DataTable from "@/components/data-table.component";
import React, { useEffect, useState } from "react";
import { DataTableRow } from "@/components/data-table.component";
import api from "@/api";

type Props = {};

const PanelView = (props: Props) => {
  const { Registries, error, allRegistries, isLoading } =
    api.useRegistryFindMany();
  const [tableData, setTableData] = useState<DataTableRow[]>([]);

  useEffect(() => {
    if (Registries) {
      const formattedData: DataTableRow[] = Registries.map((registry: any) => ({
        MotId: registry.MotId || "",
        name: registry.name || "",
        Laboratory: registry.Laboratory || "",
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
      }));

      setTableData(formattedData);
    }
  }, [Registries]);

  useEffect(() => {
    allRegistries();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading registries</p>;

  return <DataTable data={tableData} />;
};

export default PanelView;
