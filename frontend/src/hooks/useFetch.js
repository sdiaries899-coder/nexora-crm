import { useState, useEffect, useCallback } from "react";

/**
 * @desc Generic fetch hook
 */
const useFetch = (fetchFn, options = {}) => {
  const { immediate = true, params = null } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (overrideParams) => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchFn(overrideParams || params);

        setData(res?.data ?? res);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, params]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
};

export default useFetch;