import fetcher from "@/utilities/fetcher";
import useSWR from "swr";

export function useRegistryFindMany() {  
  const {
    data: Registries,
    error,
    mutate,
    isLoading,
  } = useSWR(`/registry/findMany`, fetcher);

  const allRegistries = async () => {
    try {
      await fetcher("/registry/findMany", "get");
      mutate();
    } catch (err) {
      throw new Error("An error occurred!");
    }
  };

  return { Registries, error, allRegistries, isLoading };
}
