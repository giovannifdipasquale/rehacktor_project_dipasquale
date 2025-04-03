import React, { useState, useEffect, useCallback } from "react";

function useFetchSolution(initialUrl) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    url,
    loading,
    error,
    data,
    load,
    setUrl,
  };
}

export default useFetchSolution;
