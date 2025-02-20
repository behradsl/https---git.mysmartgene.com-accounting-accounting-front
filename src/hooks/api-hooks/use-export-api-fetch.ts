import { useState, useEffect } from "react";
import axios from "axios";

export function useExportApiFetch(route: string) {
  const [data, setData] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(route, {
        responseType: "blob", 
        headers: {
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
        },
      });

      const blob = response.data;
      const downloadUrl = URL.createObjectURL(blob);

      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "registry.xlsx"; 
      link.click();

      setData(blob);
    } catch (err: any) {
      setError(err.message || "Failed to fetch the file");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route]);

  return { data, error, isLoading };
}
