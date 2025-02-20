import fetcher from "@/utilities/fetcher";
import { toast } from "sonner";
import { AxiosError, AxiosRequestConfig } from "axios";

export async function useApiMutation<T>(
  method: "post" | "put" | "delete",
  route: string,
  payload?: T,
  config?: AxiosRequestConfig
) {
  try {
    const response = await fetcher[method](route, payload as any, config);

    toast.success(`Successfully ${method.toUpperCase()}ED: ${route}`);

    return response;
  } catch (error) {
    
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || error.response?.data || "Unknown error occurred";
      
      toast.error(`Error: ${errorMessage}`);
      console.error(`Axios Error in ${method.toUpperCase()} ${route}:`, errorMessage);
    } else {
      
      toast.error(`Unexpected error in ${method.toUpperCase()} ${route}`);
      console.error(`Unexpected Error in ${method.toUpperCase()} ${route}:`, error);
    }

    throw error; 
  }
}
