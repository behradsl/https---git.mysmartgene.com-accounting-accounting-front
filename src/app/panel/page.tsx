import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Page = () => {
  return (
    <div>
      <header className='mb-8 flex items-center'>
        <SidebarTrigger className='mr-4' />
        <h1 className='text-2xl font-bold'>Dashboard Panel</h1>
      </header>
    </div>
  );
};

export default Page;
