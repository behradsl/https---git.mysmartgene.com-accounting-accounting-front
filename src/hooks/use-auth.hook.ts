import useSWR from "swr";
import fetcher from "@/utilities/fetcher";
import { useUser ,UserStoreType} from "@/store/user.store";


export function useAuth() {
  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR(`/auth/user`, fetcher);

  const { setUser } = useUser();

  const login = async (username: string, password: string) => {
    try {
      const userInfo = await fetcher("/auth/user/signin", "post", {
        username,
        password,
      });
      mutate();
      setUser(userInfo);
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    await fetcher("/auth/user/signout", "post");
    mutate(null);
    setUser(undefined);
  };

  const isLoggedIn = async () => {
    const user = await fetcher<UserStoreType['user']>("/auth/user", "get");
    mutate(null);
    if (user?.id) setUser(user);
    else setUser(undefined);

    return user;
  };

  return { user, error, login, logout, isLoading, isLoggedIn };
}
