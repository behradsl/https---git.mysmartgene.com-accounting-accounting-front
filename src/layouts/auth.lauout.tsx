"use client";

import AppSidebar from "@/components/app-sidebar/app.sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/api";
import { useUser } from "@/store/user.store";
import { usePathname, useRouter } from "next/navigation";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { revalidate } = useAuth();
  const { user, setUser } = useUser();

  const activePath = useMemo(() => {
    if (pathname.startsWith("/panel")) return "panel";

    if (pathname.startsWith("/login")) return "login";
    return "";
  }, [pathname]);

  const checkUserAuthenticationStatus = useCallback(async () => {
    const user = await revalidate();
    setUser(user?.data);

    if (!user?.data && activePath != "login") router.replace("/login");

    if (activePath === "login" && user?.data) router.replace("/panel");
  }, [activePath]);

  useEffect(() => {
    checkUserAuthenticationStatus();
  }, [activePath, user?.id]);

  // useEffect(() => {
  //   const source = cancelToken.source();
  //   getUserData(source);
  //   return () => source.cancel("Authentication check canceled ...");
  // }, [JSON.stringify(user || {}), getUserData]);

  if (activePath === "login") return <>{children}</>;
  else if (user?.id) {
    // if (["SUPERVISOR", "RECEPTION", "ADMIN"].includes(user.role))
    return (
      <SidebarProvider>
        <AppSidebar>{children}</AppSidebar>
      </SidebarProvider>
    );
    //   if (
    //     user.role === "CONSULTANT" &&
    //     ["dashboard", "patients", "contacts", "calendar"].includes(activePath)
    //   )
    //     return <>{children}</>;
    //   if (
    //     user.role === "OPERATOR" &&
    //     ["dashboard", "contacts"].includes(activePath)
    //   )
    //     return <>{children}</>;
    //   return <ErrorView type="forbidden" />;
  } else {
    return <></>;
  }
};

export default AuthLayout;
