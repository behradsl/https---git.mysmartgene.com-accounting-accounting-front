"use client";

import { useEffect, useState } from "react";
import { useLaboratoryInvoiceFindMany } from "@/hooks/api/use-laboratory-invoice.hook";
import LaboratoryInvoicesTableView from "./laboratory-invoices-table.view";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/store/user.store";
import { LaboratoryInvoiceEntity } from "@/types/laboratory-invoice.type";

interface LaboratoryInvoicesViewProps {}

const LaboratoryInvoicesView = ({}: LaboratoryInvoicesViewProps) => {
  const currentUser = useUser((state) => state.user);
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    laboratoryInvoices,
    mutate,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    setSortBy,
    sortBy,
  } = useLaboratoryInvoiceFindMany();

  useEffect(() => {
    if (laboratoryInvoices) {
      const formattedData = laboratoryInvoices?.invoices
        .filter(
          (invoice): invoice is LaboratoryInvoiceEntity =>
            invoice !== undefined,
        )
        .map((invoice: LaboratoryInvoiceEntity) => ({
          id: invoice.id,
          usdExchangeRate: invoice.usdExchangeRate,
          notes: invoice.notes || "",
          invoiceDate: invoice.invoiceDate || "",
          paymentDueDate: invoice.paymentDueDate || "",
          totalUsdPrice: invoice.totalUsdPrice || "",
          totalPriceRial: invoice.totalPriceRial || "",
          outstandingAmount: invoice.outstandingAmount || "",
          status: invoice.status || "",
          createdAt: invoice.createdAt || "",
          updatedAt: invoice.updatedAt || "",
          createdBy: invoice.createdBy || "",
          updatedBy: invoice.updatedBy || "",
          Laboratory: invoice.Laboratory || "",
          invoiceNumber: invoice.invoiceNumber || "",
          paymentStatus: invoice.paymentStatus || "",
          LaboratoryId: invoice.LaboratoryId || "",
        }));

      setTableData(formattedData);
    }
  }, [laboratoryInvoices]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>Laboratory Invoices</h1>
        </header>
      </div>
      <LaboratoryInvoicesTableView
        data={tableData}
        reloadInvoicesList={mutate}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allItemsCount={laboratoryInvoices?.count || 0}
      />
    </main>
  );
};

export default LaboratoryInvoicesView;
