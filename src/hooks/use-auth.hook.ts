import useSWR, { mutate } from "swr";
import fetcher from "@/utilities/fetcher";
import { useUser } from "@/store/user.store";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

export type UserStoreType = {
  user?: {
    id: string;
    name: string;
    position: string;
    phoneNumber: string;
    email: string;
  };
  setUser: (userData: UserStoreType["user"]) => void;
};

export function useAuth() {
  const {
    data: userData,
    error,
    isLoading,
  } = useSWR<UserStoreType["user"]>(`/auth/user`, fetcher.get);

  const { setUser, user } = useUser();
  const revalidate = () => mutate("/auth/user");
  const login = async (
    username: string,
    password: string,
    rememberMe: Boolean
  ) => {
    const userInfo: Promise<AxiosResponse<UserStoreType["user"]>> =
      fetcher.post("/auth/signin", {
        username,
        password,
        rememberMe,
      });

    return toast.promise(userInfo, {
      loading: "Loading...",
      success: (data) => {
        console.log(data.data);

        setUser(data.data);
        console.log(data.data?.name);

        return `user :${data.data?.name} welcome!`;
      },
      error: (err: AxiosError) => {
        return `login failed: ${String(err.message)}`;
      },
    });
  };

  const logout = async () => {
    await fetcher.post("/auth/signout");

    setUser(undefined);
  };

  return { userData, error, login, logout, isLoading, revalidate };
}
