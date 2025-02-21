import useSWR, { mutate } from "swr";
import fetcher from "@/utilities/fetcher";
import { useUser } from "@/store/user.store";
import { AxiosError, type AxiosResponse } from "axios";
import type { UserEntity } from "@/types/user-entity.type";

export function useAuth() {
  const { setUser, user } = useUser();
  const { data, error, isLoading } = useSWR<
    AxiosResponse<UserEntity>,
    AxiosError
  >(`/auth/user`, fetcher.get, {
    onError: (data, key, config) => {
      console.log({ data, key, config });
    },
    shouldRetryOnError: false,
  });

  const revalidate = () =>
    mutate<AxiosResponse<UserEntity>>("/auth/user").then((data) => {
      setUser(data?.data);
      return data;
    });

  const login = async (
    username: string,
    password: string,
    rememberMe: Boolean
  ) => {
    try {
      const userInfo: AxiosResponse<UserEntity> = await fetcher.post(
        "/auth/sign-in",
        {
          username,
          password,
          rememberMe,
        }
      );
      setUser(userInfo.data);
      return userInfo.data;
    } catch (error) {
      throw new Error((error as AxiosError).message);
    }
  };

  const logout = async () => {
    await fetcher.post("/auth/sign-out");

    setUser(undefined);
  };

  return { data, error, login, logout, isLoading, revalidate };
}
