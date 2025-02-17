"use client";

import { useAuth } from "@/hooks/use-auth.hook";
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
  const { user } = useUser();
  const { isLoggedIn } = useAuth();

  const activePath = useMemo(() => {
    if (pathname.startsWith("/panel")) return "panel";

    if (pathname.startsWith("/login")) return "login";
    return "";
  }, [pathname]);

  const checkUserAuthenticationStatus = useCallback(async () => {
    const userData = await isLoggedIn();
    console.log({userData});
    
    if (!userData && activePath != "login") router.replace("/login");

    if (activePath === "login" && userData) router.replace("/panel");
  }, [activePath, isLoggedIn]);

  useEffect(() => {
    checkUserAuthenticationStatus();
    console.log(activePath);
    
  }, [activePath]);

  // useEffect(() => {
  //   const source = cancelToken.source();
  //   getUserData(source);
  //   return () => source.cancel("Authentication check canceled ...");
  // }, [JSON.stringify(user || {}), getUserData]);

  if (user) {
    // if (["SUPERVISOR", "RECEPTION", "ADMIN"].includes(user.role))
    return <>{children}</>;
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
    if (activePath === "login") return <>{children}</>;
    return <></>;
  }
};

export default AuthLayout;
