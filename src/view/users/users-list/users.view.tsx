"use client";
import { useEffect, useState } from "react";
import UsersTableView from "./users-table.view";
import type { UsersDataTableRow } from "./users-table-columns.data";
import { useUserFindMany } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UsersViewProps {}

const UsersView = ({}: UsersViewProps) => {
  const [tableData, setTableData] = useState<UsersDataTableRow[]>([]);
  const { users, mutate } = useUserFindMany();

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
  }, [users?.data.length]);

  return (
    <main className='w-full py-4 px-2'>
      <div className='flex items-center justify-between gap-3 w-full'>
        <h2 className='font-semibold text-xl'>Users List</h2>
        <div>
          <Button asChild variant={"default"}>
            <Link href={`/panel/users/create`}>Create User</Link>
          </Button>
        </div>
      </div>
      <UsersTableView data={tableData} reloadUsersList={mutate} />
    </main>
  );
};

export default UsersView;
