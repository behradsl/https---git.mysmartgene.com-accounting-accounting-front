import DataTable from "@/components/data-table.component";
import React from "react";
import { DataTableRow } from "@/components/data-table.component";

type Props = {};

const PanelView = (props: Props) => {

  
  const data: DataTableRow[] = [
    {
      MotId: "kjksf",
      name: "kjskffs",
      Laboratory: "kshdf",
      serviceType: "984375",
      kitType: "5454",
      urgentStatus: true,
      price: 12324,
      description: "Sample description",
      costumerRelationInfo: "Customer details here",
      KoreaSendDate: new Date("2025-02-01"),
      resultReady: false,
      resultReadyTime: new Date("2025-02-05"),
      settlementStatus: "Pending",
      invoiceStatus: "Overdue",
      proformaSent: true,
      proformaSentDate: new Date("2025-01-15"),
      totalInvoiceAmount: 50000,
      installmentOne: 20000,
      installmentOneDate: new Date("2025-01-20"),
      installmentTwo: 20000,
      installmentTwoDate: new Date("2025-02-05"),
      installmentThree: 10000,
      installmentThreeDate: new Date("2025-02-15"),
      totalPaid: 40000,
      settlementDate: new Date("2025-02-10"),
      officialInvoiceSent: true,
      officialInvoiceSentDate: new Date("2025-02-12"),
      sampleStatus: "Completed",
      sendSeries: "2025-02-01",
    },
  ];

  return <DataTable data={data} />;
};

export default PanelView;
