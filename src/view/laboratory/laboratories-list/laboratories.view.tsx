"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLaboratoryFindMany } from "@/hooks/api/use-laboratory.hook";
import { LaboratoriesDataTableRow } from "./laboratories-table-columns.data";
import LaboratoriesTableView from "./laboratories-table.view";
import { LaboratoriesType, PaymentType } from "@/types/laboratory-entity.type";

const LaboratoriesView = () => {
  const [tableData, setTableData] = useState<LaboratoriesDataTableRow[]>([]);
  const { laboratories, mutate } = useLaboratoryFindMany();

  useEffect(() => {
    if (laboratories?.data) {
      const formattedData: LaboratoriesDataTableRow[] = laboratories.data?.map(
        (laboratory:any) => ({
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
          accountManager:laboratory?.accountManager ||"",
          

          createdAt: laboratory?.createdAt
            ? new Date(laboratory.createdAt).toISOString()
            : "",
          updatedAt: laboratory?.updatedAt
            ? new Date(laboratory?.updatedAt).toISOString()
            : "",

          createdBy: laboratory?.createdBy || "",

          LaboratoryFormalPaymentInfo:
            laboratory?.LaboratoryFormalPaymentInfo || "",

          
        })
      );

      setTableData(formattedData);
    }
  }, [laboratories?.data.length]);

  return (
    <main className="w-full py-4 px-2">
      <div className="flex items-center justify-between gap-3 w-full">
        <h2 className="font-semibold text-xl">Laboratories List</h2>
        <div>
          <Button asChild variant={"default"}>
            <Link href={`/panel/laboratories/create`}>Create Laboratory</Link>
          </Button>
        </div>
      </div>
      <LaboratoriesTableView data={tableData} reloadUsersList={mutate} />
    </main>
  );
};

export default LaboratoriesView;
