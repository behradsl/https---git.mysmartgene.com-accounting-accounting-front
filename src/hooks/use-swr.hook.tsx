import fetcher from "@/utilities/fetcher"
import useSWR from "swr"
import { toast } from "sonner"

export function useSwr<T>(route: string) {
  const { data, error, isLoading, mutate ,} = useSWR<T>(route, fetcher.get)

  if (error) {
    toast.error(`Failed to fetch ${route}`)
  }

  return { data, error, isLoading, mutate }
}
