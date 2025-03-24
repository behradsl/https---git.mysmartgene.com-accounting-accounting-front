"use client";

import { useEffect, useState } from "react";
import { useLaboratoryInvoicePaymentFindMany } from "@/hooks/api/use-laboratory-invoice.hook";
import LaboratoryPaymentsTableView from "./laboratory-payments-table.view";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/store/user.store";
import { LaboratoryPaymentDataTableRow } from "./laboratory-payments-table-columns.data";
import { LaboratoryInvoicePaymentEntity } from "@/types/laboratory-invoice.type";

interface LaboratoryPaymentsViewProps {}

const LaboratoryPaymentsView = ({}: LaboratoryPaymentsViewProps) => {
  const currentUser = useUser((state) => state.user);
  const [tableData, setTableData] = useState<LaboratoryPaymentDataTableRow[]>(
    [],
  );
  const {
    laboratoryInvoicePayments,
    mutate,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    setSortBy,
    sortBy,
  } = useLaboratoryInvoicePaymentFindMany();

  useEffect(() => {
    if (laboratoryInvoicePayments?.payments) {
      const formattedData: LaboratoryPaymentDataTableRow[] =
        laboratoryInvoicePayments.payments.map((payment: any) => ({
          id: payment.id || "",
          LaboratoryInvoiceId: payment.LaboratoryInvoiceId || "",
          LaboratoryId: payment.LaboratoryId || "",
          amountPaid: payment.amountPaid || "",
          paymentDate: payment.paymentDate || "",
          currency: payment.currency || "",
          notes: payment.notes || "",
          createdAt: payment.createdAt || "",
          updatedAt: payment.updatedAt || null,
          createdById: payment.createdById || "",
          updatedById: payment.updatedById || null,
          createdBy: payment.createdBy || {
            name: "",
            email: "",
            position: "",
            id: "",
          },
          updatedBy: payment.updatedBy || null,
          Laboratory: payment.Laboratory || {
            name: "",
          },
          invoiceNumber: payment.Invoice?.invoiceNumber || 0,
        }));

      setTableData(formattedData);
    }
  }, [laboratoryInvoicePayments]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>Laboratory Payments</h1>
        </header>
      </div>
      <LaboratoryPaymentsTableView
        data={tableData}
        reloadPaymentsList={mutate}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allItemsCount={laboratoryInvoicePayments?.count || 0}
      />
    </main>
  );
};

export default LaboratoryPaymentsView;
