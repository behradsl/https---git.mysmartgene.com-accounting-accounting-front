

import useSWR from "swr";
import fetcher from "@/utilities/fetcher";

export function useAuth() {
  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR(`/auth/user`, fetcher);

  const login = async (username: string, password: string) => {
    try {
      await fetcher("/auth/user/signin", "post", { username, password });
      mutate();
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    await fetcher("/auth/user/signout", "post");
    mutate(null);
  };

  return { user, error, login, logout, isLoading };
}
