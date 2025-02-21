"use client";
import { useEffect, useState } from "react";
import UsersTableView from "./users-table.view";
import type { UsersDataTableRow } from "./users-table-columns.data";
import { useUserFindMany } from "@/hooks/api";

interface UsersViewProps {}

const UsersView = ({}: UsersViewProps) => {
  const [tableData, setTableData] = useState<UsersDataTableRow[]>([]);
  const { users } = useUserFindMany();

  useEffect(() => {
    if (users?.data) {
      const formattedData: UsersDataTableRow[] = users.data?.map((user) => ({
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
  }, [users?.data]);

  return (
    <main className='w-full'>
      <UsersTableView data={tableData} />
    </main>
  );
};

export default UsersView;
