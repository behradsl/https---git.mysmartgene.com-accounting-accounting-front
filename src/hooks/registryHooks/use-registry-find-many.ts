import useSWR from "swr";
import fetcher from "@/utilities/fetcher";

export function useRegistryFindMany() {
  const {
    data: user,
    error,
    mutate,
    isLoading,
  } = useSWR(`/registry/findMany`, fetcher);

  const login = async (username: string, password: string) => {
    try {
      await fetcher("/registry/findMany", "post", { });
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
