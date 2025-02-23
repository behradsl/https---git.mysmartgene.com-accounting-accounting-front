import { AppSidebar } from "@/components/app-sidebar.component"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useEffect, useState, type FC, type PropsWithChildren } from "react"
import RegistryTableView from "./registry-table.view"
import type { DataTableRow } from "./registry-table-columns.data"
import { useRegistryFindMany } from "@/hooks/api"

interface RegistryViewProps {}

const RegistryView = ({}: RegistryViewProps) => {
  const [tableData, setTableData] = useState<DataTableRow[]>([])
  const { registries, error, isLoading } = useRegistryFindMany()

  useEffect(() => {
    if (registries?.data) {
      const formattedData: DataTableRow[] = registries.data?.map(
        (registry: any) => ({
          MotId: registry.MotId?.value || "",
          name: registry.name?.value || "",
          Laboratory: registry.Laboratory?.value || "",
          serviceType: registry.serviceType?.value || "",
          kitType: registry.kitType?.value || "",

          urgentStatus: registry.urgentStatus?.value || false,
          price: registry.price?.value || 0,
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
          totalInvoiceAmount: registry.totalInvoiceAmount?.value || 0,
          installmentOne: registry.installmentOne?.value || 0,
          installmentOneDate: registry.installmentOneDate?.value
            ? new Date(registry.installmentOneDate?.value).toISOString()
            : "",
          installmentTwo: registry.installmentTwo?.value || 0,
          installmentTwoDate: registry.installmentTwoDate?.value
            ? new Date(registry.installmentTwoDate?.value).toISOString()
            : "",
          installmentThree: registry.installmentThree?.value || 0,
          installmentThreeDate: registry.installmentThreeDate?.value
            ? new Date(registry.installmentThreeDate?.value).toISOString()
            : "",
          totalPaid: registry.totalPaid?.value || 0,
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
          updatedBy: registry.registryUpdatedBy?.value || ""
        })
      )

      setTableData(formattedData)
    }
  }, [registries])

  useEffect(() => {}, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <RegistryTableView data={tableData} />
      </main>
    </SidebarProvider>
  )
}

export default RegistryView
