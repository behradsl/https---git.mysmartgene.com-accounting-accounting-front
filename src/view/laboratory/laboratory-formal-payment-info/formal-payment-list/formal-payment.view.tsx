"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useLaboratoryFindMany,
  useLaboratoryFormalPaymentInfoFind,
} from "@/hooks/api/use-laboratory.hook";
import LaboratoriesTableView from "./formal-payment-table.view";

import { useParams } from "next/navigation";
import { PaymentInfoDataTableRow } from "./formal-payment-table-columns.data";

const FormalPaymentView = () => {
  const { laboratoryId } = useParams();
  const { paymentInfo } = useLaboratoryFormalPaymentInfoFind(
    laboratoryId as string
  );

  const [tableData, setTableData] = useState<PaymentInfoDataTableRow>();

  useEffect(() => {
    if (paymentInfo?.data) {
      const formattedData: PaymentInfoDataTableRow = {
        laboratoryId:
          paymentInfo.data.LaboratoryFormalPaymentInfo?.laboratoryId || "",
        name: paymentInfo.data?.name || "",
        legalEntityName:
          paymentInfo.data.LaboratoryFormalPaymentInfo?.legalEntityName || "",
        registrationNumber:
          paymentInfo.data?.LaboratoryFormalPaymentInfo?.registrationNumber ||
          "",
        nationalId:
          paymentInfo.data?.LaboratoryFormalPaymentInfo?.nationalId || "",
        economicNumber:
          paymentInfo.data?.LaboratoryFormalPaymentInfo?.economicNumber || "",
        postalCode:
          paymentInfo.data?.LaboratoryFormalPaymentInfo?.postalCode || "",
        fullAddress:
          paymentInfo.data?.LaboratoryFormalPaymentInfo?.fullAddress || "",
        province: paymentInfo.data?.LaboratoryFormalPaymentInfo?.province || "",
        city: paymentInfo.data?.LaboratoryFormalPaymentInfo?.city || "",
      };

      setTableData(formattedData);
    }
  }, [paymentInfo?.data]);

  return (
    <main className="w-full py-4 px-2">
      <div className="flex items-center justify-between gap-3 w-full">
        <h2 className="font-semibold text-xl">payment info</h2>
      </div>
      <LaboratoriesTableView data={tableData ? [tableData] : []} />
    </main>
  );
};

export default FormalPaymentView;
