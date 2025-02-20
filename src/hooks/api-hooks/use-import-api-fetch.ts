import { useState } from "react";
import axios from "axios";

export function useImportApiFetch(route:string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const importData = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(route, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to upload the file");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    importData,
    isLoading,
    error,
    success,
  };
}
