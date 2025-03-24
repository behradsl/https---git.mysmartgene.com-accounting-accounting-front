"use client";
import { useEffect, useState } from "react";
import UsersTableView from "./users-table.view";
import type { UserDataTableRow } from "./users-table-columns.data";
import { useUserFindMany } from "@/hooks/api";
import UserCreateDialogView from "../user-create/user-create-dialog.view";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface UsersViewProps {}

const UsersView = ({}: UsersViewProps) => {
  const [tableData, setTableData] = useState<UserDataTableRow[]>([]);
  const { users, mutate } = useUserFindMany();

  useEffect(() => {
    if (users?.data) {
      const formattedData: UserDataTableRow[] = users.data?.map((user) => ({
        id: user.id || "",
        email: user.email || "",
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        position: user.position || "",
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : "",
        updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : "",
      }));

      setTableData(formattedData);
    }
  }, [users?.data.length]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <header className='mb-8 flex items-center'>
          <SidebarTrigger className='mr-4' />
          <h1 className='text-2xl font-bold'>Users List</h1>
        </header>
        <div>
          <UserCreateDialogView onClose={mutate} />
        </div>
      </div>
      <UsersTableView data={tableData} reloadUsersList={mutate} />
    </main>
  );
};

export default UsersView;
