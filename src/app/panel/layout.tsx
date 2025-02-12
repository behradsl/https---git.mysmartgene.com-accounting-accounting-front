
import SidebarApp from "@/components/sildebar-app.component";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <SidebarApp/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
