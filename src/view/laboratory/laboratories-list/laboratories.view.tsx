"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import { LaboratoriesDataTableRow } from "./laboratories-table-columns.data";
import LaboratoriesTableView from "./laboratories-table.view";
import { LaboratoriesType, PaymentType } from "@/types/laboratory-entity.type";
import LaboratoryCreateDialogView from "../laboratory-create/laboratory-create-dialog.view";
import { SidebarTrigger } from "@/components/ui/sidebar";

const LaboratoriesView = () => {
  const [tableData, setTableData] = useState<LaboratoriesDataTableRow[]>([]);
  const {
    laboratories,
    mutate,
    currentPage,
    pageSize,
    setCurrentPage,
    setSortBy,
    sortBy,
    setPageSize,
  } = useLaboratoryFindMany();

  useEffect(() => {
    if (laboratories?.data) {
      const formattedData: LaboratoriesDataTableRow[] = laboratories.data?.map(
        (laboratory: any) => ({
          id: laboratory?.id || "",
          name: laboratory?.name || "",
          type: laboratory?.type || LaboratoriesType.LABORATORY,
          code: laboratory?.code || "",
          address: laboratory?.address || "",
          contactName: laboratory?.contactName || "",
          phoneNumber: laboratory?.phoneNumber || "",
          email: laboratory?.email || "",
          paymentType: laboratory?.paymentType || PaymentType.INFORMAL,
          fax: laboratory?.fax || "",

          accountManagerId: laboratory?.accountManagerId || "",
          accountManager: laboratory?.accountManager || "",

          createdAt: laboratory?.createdAt
            ? new Date(laboratory.createdAt).toISOString()
            : "",
          updatedAt: laboratory?.updatedAt
            ? new Date(laboratory?.updatedAt).toISOString()
            : "",

          createdBy: laboratory?.createdBy || "",

          LaboratoryFormalPaymentInfo:
            laboratory?.LaboratoryFormalPaymentInfo || "",
        }),
      );

      setTableData(formattedData);
    }
  }, [laboratories?.data.length]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>Laboratories</h1>
        </header>
        <div>
          <LaboratoryCreateDialogView onClose={mutate} />
        </div>
      </div>
      <LaboratoriesTableView
        data={tableData}
        reloadLaboratoriesList={mutate}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        // allItemsCount={registries?.data?.totalCount}
      />
    </main>
  );
};

export default LaboratoriesView;
