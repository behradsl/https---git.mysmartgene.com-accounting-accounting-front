import fetcher from "@/utilities/fetcher"
import { toast } from "sonner"
import { AxiosError, type AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"

export async function useApiMutation<T>(
  method: "post" | "put" | "delete",
  route: string,
  payload?: T,
  config?: AxiosRequestConfig
) {
  try {
    const response = await fetcher[method](route, payload as any, config)

    toast.success(`Successfully ${method.toUpperCase()}ED: ${route}`)

    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Unknown error occurred"

      toast.error(`Error: ${errorMessage}`)
      console.error(
        `Axios Error in ${method.toUpperCase()} ${route}:`,
        errorMessage
      )
    } else {
      toast.error(`Unexpected error in ${method.toUpperCase()} ${route}`)
      console.error(
        `Unexpected Error in ${method.toUpperCase()} ${route}:`,
        error
      )
    }

    throw error
  }
}

export function useApiDownload(route: string) {
  const [data, setData] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      const response = await fetcher.get(route, {
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Excel MIME type
        }
      })

      const blob = response.data
      const downloadUrl = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = "registry.xlsx"
      link.click()

      setData(blob)
    } catch (err: any) {
      setError(err.message || "Failed to fetch the file")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [route])

  return { data, error, isLoading }
}
export function useApiUpload(route: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const importData = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetcher.post(route, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.status === 200) {
        setSuccess(true)
      }
    } catch (err) {
      setError("Failed to upload the file")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    importData,
    isLoading,
    error,
    success
  }
}
