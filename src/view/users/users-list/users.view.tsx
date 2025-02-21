import { AppSidebar } from "@/components/app-sidebar.component"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useEffect, useState, type FC, type PropsWithChildren } from "react"
import UsersTableView from "./users-table.view"
import type { UsersDataTableRow, userColumns } from "./users-table-columns.data"
import { useRegistryPreviewFindMany, useUserFindMany } from "@/hooks/api"

interface UsersViewProps {}

const UsersView = ({}: UsersViewProps) => {
  const [tableData, setTableData] = useState<UsersDataTableRow[]>([])
  const { users, error, isLoading } = useUserFindMany()

  useEffect(() => {
    if (users?.data) {
      const formattedData: UsersDataTableRow[] = users.data?.map((user) => ({
        id: user.id || "",
        email: user.email || "",
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        position: user.position || "",
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : "",
        updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : ""
      }))

      setTableData(formattedData)
    }
  }, [users?.data])

  useEffect(() => {}, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <UsersTableView data={tableData} />
      </main>
    </SidebarProvider>
  )
}

export default UsersView
